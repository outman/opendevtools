import { SendIcon } from "@/components/IconWrapper";
import { useEffect, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";


export function Footer(props) {
  const [content, setContent] = useState('');
  const [btnSendEnabled, setBtnSendEnabled] = useState(true);

  let { onUpdateContent } = { ...props };
  const handlerClickSubmit = (e) => {
    e.preventDefault();
    onUpdateContent(content);
    setContent('');
  };

  useEffect(() => {
    if (content.length > 0) {
        setBtnSendEnabled(false)
    } else {
        setBtnSendEnabled(true)
    }
  }, [content]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key == 'Enter') {
        handlerClickSubmit(event);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  return (
    <div className="relative w-full">
      <div className="fixed bottom-4 flex flex-col w-3/6 space-y-2">
        <Textarea className="" placeholder="Enter a message" value={content} onChange={(e) => {
            setContent(e.target.value);
        }} variant="bordered" />
        <div className="flex flex-row">
        <Button color="primary" onClick={handlerClickSubmit} isDisabled={btnSendEnabled}>
            <span className="font-bold">Ctrl+Enter</span>
            <SendIcon className="h-6 w-6 ml-2 transform rotate-90" />
        </Button>
        </div>
      </div>
    </div>
  );
}
