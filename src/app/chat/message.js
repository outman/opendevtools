import { UserIcon, DesktopIcon, CommandLineIcon, CopyIcon } from "@/components/IconWrapper";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from "@nextui-org/react";


export function Message(props) {
  let { message } = { ...props };

  const handleCopy = text => e => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex flex-row space-x-2">
      <div className="flex py-1">
        {message.role === "system" && (
          <CommandLineIcon className="w-6 h-6 rounded-full"></CommandLineIcon>
        )}
        {message.role === "user" && (
          <UserIcon className="w-6 h-6 rounded-full"></UserIcon>
        )}
        {message.role === "assistant" && (
          <DesktopIcon className="w-6 h-6 rounded-full"></DesktopIcon>
        )}
      </div>
      <div className="text-sm w-full">
        <div
          className={
            message.role === "user"
              ? "text-sm bg-indigo-100 py-2 px-2 shadow rounded-md"
              : "text-sm bg-white py-2 px-2 shadow rounded-md"
          }
        >
          <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const {children, className, node, ...rest} = props
              const match = /language-(\w+)/.exec(className || '')
              let text = String(children).replace(/\n$/, '');
              return match ? (
                <div className="relative">
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={{
                      ...theme,
                      "position": "relative"
                    }}
                  >
                  {text === 'undefined' ? '' : text}
                  </SyntaxHighlighter>
                  <Button isIconOnly color="success" size="sm"
                  style={{ position: "absolute", top: '6px', right: '6px' }}
                  onClick={ handleCopy(text) }>
                    <CopyIcon className="w-4 h-4"></CopyIcon>
                  </Button>
                </div>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
            p: ({node, ...pProps}) => <p {...pProps} dir="auto" />,
            a: ({node, ...aProps}) => {
              const href = aProps.href || "";
              const tagClassName = aProps.className || "";
              const isInternal = /^\/#/i.test(href);
              const target = isInternal ? "_self" : aProps.target ?? "_blank";
              return <a {...aProps} target={target} className={ tagClassName + "  text-blue-500"}/>;
            }
          }}
          >
            {message.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
