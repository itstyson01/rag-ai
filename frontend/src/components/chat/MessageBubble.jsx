
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const copyCode = async (code) => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-gray-900 border border-gray-800 text-gray-100 rounded-bl-md"
        }`}
      >
        {isUser ? (
          content
        ) : (
          <div className="prose prose-invert max-w-none text-sm">
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }) {
                  const code = String(children).replace(/\n$/, "");

                  if (inline) {
                    return (
                      <code
                        className="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <div className="relative my-4">
                      <button
                        onClick={() => copyCode(code)}
                        className="absolute right-2 top-2 text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                      >
                        {copied ? "Copied!" : "Copy"}
                      </button>

                      <pre className="bg-black/50 border border-gray-700 rounded-lg p-4 overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;

