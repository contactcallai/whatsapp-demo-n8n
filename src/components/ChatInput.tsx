"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend?: (text: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({
  onSend,
  isLoading = false,
}: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend?.(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      id="chat-input"
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-wa-panel-bg px-3 py-2.5"
    >
      {/* Text input */}
      <div className="flex flex-1 items-center">
        <input
          id="chat-message-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje"
          disabled={isLoading}
          className="w-full rounded-lg border-none bg-wa-input-bg px-3 py-2.5 text-sm text-wa-text-primary outline-none placeholder:text-wa-text-light disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Send / Loading button */}
      <button
        id="chat-send-button"
        type="submit"
        disabled={isLoading || !text.trim()}
        aria-label="Enviar mensaje"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wa-green-send text-white transition-all hover:bg-[#008f72] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          /* Spinner */
          <svg
            className="animate-spin-slow h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          /* Send arrow */
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
          </svg>
        )}
      </button>
    </form>
  );
}
