"use client";

import { CopyIcon } from "@/components/IconWrapper";
import { Textarea, Button, ButtonGroup, Chip } from "@nextui-org/react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function JsonPage() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handlePretty = (e) => {
    e.preventDefault();
    try {
      setResult(JSON.stringify(JSON.parse(content), null, 2));
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const handleMinify = (e) => {
    e.preventDefault();
    try {
      setResult(JSON.stringify(JSON.parse(content)));
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(result);
    setError("Copy success.");
    setTimeout(() => {
      setError("");
    }, 2000);
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between">
        <ButtonGroup>
          <Button color="primary" size="sm" onClick={handlePretty}>
            Pretty
          </Button>
          <Button color="primary" size="sm" onClick={handleMinify}>
            Minify
          </Button>
        </ButtonGroup>
        {error ? (
          <Chip color={error === "Copy success." ? "success" : "danger"}>
            {error}
          </Chip>
        ) : null}
      </div>
      <div className="flex flex-row space-x-4">
        <div className="basis-1/3">
          <Textarea
            placeholder="Enter json"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="bordered"
            minRows={40}
            maxRows={45}
          ></Textarea>
        </div>
        <div className="basis-2/3 overflow-x-auto">
          {result ? (
            <div style={{ position: "relative" }}>
              <SyntaxHighlighter
                wrapLines={true}
                showLineNumbers={true}
                language="json"
                customStyle={{
                  margin: "0px",
                  fontSize: "0.8em",
                }}
                style={oneDark}
              >
                {result}
              </SyntaxHighlighter>
              <Button
                isIconOnly
                color="success"
                size="sm"
                onClick={handleCopy}
                style={{ position: "absolute", top: "8px", right: "8px" }}
              >
                <CopyIcon className="w-6 h-6" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
