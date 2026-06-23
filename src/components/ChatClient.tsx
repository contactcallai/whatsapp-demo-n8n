"use client";

import { useState, useEffect, useRef } from "react";
import type { Message } from "@/types";
import ChatHeader from "./ChatHeader";
import ChatView from "./ChatView";
import ChatInput from "./ChatInput";

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate sessionId safely after mount to avoid hydration mismatch
  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  // Auto-scroll when messages change or loading state toggles
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !sessionId) return;

    const now = new Date();
    const timestamp = now.toISOString();
    const timeStr = now.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: text.trim(),
      sender: "user",
      timestamp: timeStr,
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: text.trim(),
          timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: data.reply || "Sin respuesta del servidor.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Mark user message as delivered, add bot response
      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMessage.id ? { ...m, status: "delivered" as const } : m
        ).concat(botMessage)
      );
    } catch (error) {
      console.error("Error al enviar mensaje:", error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: "⚠ No se pudo entregar el mensaje. Inténtalo de nuevo.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "error",
      };

      // Mark user message as error, add error response
      setMessages((prev) =>
        prev.map((m) =>
          m.id === userMessage.id ? { ...m, status: "error" as const } : m
        ).concat(errorMessage)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ChatHeader />
      <ChatView messages={messages} isLoading={isLoading} scrollRef={scrollRef} />
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
