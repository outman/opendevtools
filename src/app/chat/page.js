"use client";

import "./page.css";
import { Message } from "./message";
import { useEffect, useState, useRef } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { UniqId } from "@/util/uniq";
import { useLocalStorage } from "@/hooks";
import { PROJECT_CONFIG_STORE, Configure, USER_ROLE } from "@/util/config";
import { Loading } from "@/components/Loading";
import { ChatContext } from "@/hooks/context";
import { db } from "@/store/db";
import { Chip } from "@nextui-org/react";

export default function Chat() {
  const [error, setError] = useState('');
  const [config, setConfig] = useLocalStorage(
    PROJECT_CONFIG_STORE,
    Configure()
  );
  const [isPending, setIsPending] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: UniqId(),
      role: USER_ROLE.SYSTEM,
      content: config.systemPrompt,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);

  const [sessionId, setSessionId] = useState(UniqId());

  const scrollHeight = useRef(0);
  useEffect(() => {
    let remain = document.body.scrollHeight - window.innerHeight;
    if (scrollHeight.current !== remain && remain > 10) {
      scrollHeight.current = remain;
      if (messages.length === 1) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
    if (messages.length >= 2) {
      let item = {
        sessionId: sessionId,
        topic: messages[1].content,
        messages: messages,
        tt: new Date().getTime()
      }
      db.sessions.put({ ...item }, 'sessionId');
    }
  }, [messages, sessionId]);

  const handleResetMessage = () => {
    setMessages((pre) => {
      return [pre[0]];
    });
    setSessionId(UniqId());
  };

  const handlerClickSubmit = (content) => {
    let preMessage = [...messages];
    setMessages([
      ...preMessage,
      {
        role: USER_ROLE.USER,
        content: content,
        id: UniqId(),
      },
    ]);

    let initHeaders = new Headers();
    initHeaders.append("Content-Type", "application/json");
    initHeaders.append("Accept", "application/json");
    initHeaders.append("X-Token", config.accessToken);

    let req = new Request("/api/openai");
    let reqBody = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      model: config.model,
      organization: config.organization,
      temperature: config.temperature,
      topP: config.topP,
      presencePenalty: config.presencePenalty,
      frequencyPenalty: config.frequencyPenalty,
      stream: true,
      platform: config.platform,
    };

    let reqMessage = [];

    for (let i = 0; i < preMessage.length; i++) {
      let { iRole, iContent } = {
        iRole: preMessage[i].role,
        iContent: preMessage[i].content,
      };
      reqMessage.push({
        role: iRole,
        content: iContent,
      });
    }

    reqMessage.push({
      role: "user",
      content: content,
    });

    reqBody["messages"] = reqMessage;

    setIsPending(true);

    let options = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: initHeaders,
    };

    fetch(req, options).then((response) => {
      setIsPending(false);
      if (response.ok && response.status === 200) {
        let reader = response.body.getReader();
        const processor = async () => {
          let responseChunk = [];
          let messageId = UniqId();
          let decoder = new TextDecoder("utf-8", { stream: true});

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }

            let chunk = decoder.decode(value, { stream: true });
            responseChunk.push(chunk);

            let msg = {
              role: USER_ROLE.ASSISTANT,
              content: responseChunk.join(""),
              id: messageId,
            };

            setMessages((me) => {
              let lastMsg = me.slice(-1)[0];
              if (lastMsg.id === msg.id) {
                let tmp = me.slice(0, -1);
                return [...tmp, msg];
              } else {
                return [...me, msg];
              }
            });
          }
          return responseChunk.join("");
        };
        processor()
          .then((resp) => {
            console.log(resp);
          })
          .catch((e) => {
            console.log(e);
            setError(e.toString());
          });
      } else {
        throw new Error(response.status + ' - ' + response.statusText);
      }
    }).catch((e) => {
      console.log(e);
      setError(e.toString());
    });
  };

  return (
    <div className="w-full">
      <ChatContext.Provider value={{ config, setConfig, setSessionId }}>
        <Header handleResetMessage={handleResetMessage} handleMessage={setMessages} messages={messages}/>
        <div className="flex-1 p:2 justify-between flex flex-col mb-40">
          <div className="flex flex-col space-y-2">
            {messages.map((item, index) => (
              <Message key={`message_${index}`} message={item} />
            ))}
            {isPending && <Loading text="Loading..." />}
            {error && <Chip color="danger">Some error occurred : {error}</Chip>}
          </div>
        </div>
        <Footer onUpdateContent={handlerClickSubmit} />
      </ChatContext.Provider>
    </div>
  );
}
