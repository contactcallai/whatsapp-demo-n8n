import type { ReactNode } from "react";
import type { Message } from "@/types";

/** Parse **bold** markdown and \n line breaks into React nodes (no dangerouslySetInnerHTML) */
function formatMessage(text: string): ReactNode[] {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <span key={lineIndex}>
        {parts.map((part, partIndex) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  const isError = message.status === "error";

  return (
    <div
      className={`flex w-full animate-fade-in ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[65%] rounded-lg px-3 pt-1.5 pb-1 shadow-sm ${
          isUser
            ? "bg-wa-bubble-user bubble-tail-user"
            : isError
              ? "bg-wa-bubble-bot bubble-tail-bot"
              : "bg-wa-bubble-bot bubble-tail-bot"
        }`}
      >
        {/* Message text */}
        <p
          className={`text-sm leading-relaxed break-words ${
            isError ? "text-wa-error" : "text-wa-text-primary"
          }`}
        >
          {formatMessage(message.text)}
        </p>

        {/* Timestamp + status indicators */}
        <div className="mt-0.5 flex items-center justify-end gap-1">
          <span className="text-[11px] leading-none text-wa-text-secondary">
            {message.timestamp}
          </span>

          {/* Error indicator */}
          {isUser && isError && (
            <span className="flex items-center gap-0.5" title="No entregado">
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                className="text-wa-error"
                fill="currentColor"
              >
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8.75 10a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 1.5 0v5z" />
              </svg>
            </span>
          )}

          {/* Double check for delivered user messages */}
          {isUser && !isError && (
            <svg
              viewBox="0 0 16 11"
              width="16"
              height="11"
              className={
                message.status === "delivered"
                  ? "text-wa-check-blue"
                  : "text-wa-text-light"
              }
              fill="currentColor"
            >
              <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.31a.445.445 0 0 0-.127.332c0 .127.042.25.127.344l2.639 2.73c.076.085.178.144.28.178a.56.56 0 0 0 .356 0 .476.476 0 0 0 .263-.178L11.096 1.33a.48.48 0 0 0 .127-.34.465.465 0 0 0-.152-.337zm-3.09 7.636a.48.48 0 0 0 .127-.34.465.465 0 0 0-.152-.337l-.31-.31a.457.457 0 0 0-.305-.102.493.493 0 0 0-.381.178l-1.397 1.724-1.397-1.724a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.31a.445.445 0 0 0-.127.332c0 .127.042.25.127.344l2.03 2.101c.076.085.178.144.28.178a.56.56 0 0 0 .356 0 .476.476 0 0 0 .263-.178l1.604-1.976z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
