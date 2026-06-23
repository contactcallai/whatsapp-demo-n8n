import type { RefObject } from "react";
import type { Message } from "@/types";
import MessageBubble from "./MessageBubble";

interface ChatViewProps {
  messages: Message[];
  isLoading?: boolean;
  scrollRef?: RefObject<HTMLDivElement | null>;
}

export default function ChatView({
  messages,
  isLoading = false,
  scrollRef,
}: ChatViewProps) {
  return (
    <div
      id="chat-view"
      className="wa-chat-pattern no-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-[5%] py-4 md:px-[12%]"
    >
      {/* Date separator */}
      <div className="my-2 flex justify-center">
        <span className="rounded-lg bg-white/90 px-3 py-1 text-xs text-wa-text-secondary shadow-sm">
          Hoy
        </span>
      </div>

      {/* Messages */}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Typing indicator — conditional, independent element (not in message array) */}
      {isLoading && (
        <div className="flex w-full animate-fade-in justify-start">
          <div className="relative rounded-lg bg-wa-bubble-bot px-4 py-3 shadow-sm bubble-tail-bot">
            <div className="flex items-center gap-1.5">
              <span className="typing-dot h-2 w-2 rounded-full bg-wa-text-secondary" />
              <span className="typing-dot h-2 w-2 rounded-full bg-wa-text-secondary" />
              <span className="typing-dot h-2 w-2 rounded-full bg-wa-text-secondary" />
            </div>
          </div>
        </div>
      )}

      {/* Scroll anchor — always at the bottom, outside the message loop */}
      <div ref={scrollRef} />
    </div>
  );
}
