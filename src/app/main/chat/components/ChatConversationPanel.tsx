"use client";

import { useEffect, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { httpGet, httpPost } from "@/lib/http";

interface RawMessage {
  id: number;
  senderType: number;
  content: string;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface Props {
  conversationId: number;
}

export default function ChatConversationPanel({ conversationId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  async function loadMessages() {
    const data = await httpGet<RawMessage[]>(
      `/api/proxy/message/list?conversationId=${conversationId}`,
    );

    setMessages(
      data.map((m) => ({
        id: m.id,
        role: m.senderType === 1 ? "user" : "assistant",
        content: m.content,
      })),
    );
  }

  async function sendMessage(content: string) {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    try {
      const reply = await httpPost<string>("/api/proxy/message/chat", {
        conversationId,
        userMessageContent: content,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: `Error: ${err.message ?? "unknown"}`,
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0 text-white">
      {/* Header（重设计） */}
      <header className="px-6 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#4ef2c2] animate-pulse" />
          <span className="text-sm text-white/70">
            Conversation #{conversationId}
          </span>
        </div>

        <span className="text-xs text-white/30">
          {typing ? "thinking..." : "idle"}
        </span>
      </header>

      {/* Messages */}
      <div className="flex-1 min-h-0 relative">
        <ChatMessages messages={messages} typing={typing} />
      </div>

      {/* Input（升级为 command zone） */}
      <div
        className="
          border-t border-white/10
          p-4
          bg-[#0f1115]/80 backdrop-blur
        "
      >
        <ChatInput onSend={sendMessage} disabled={typing} />
      </div>
    </div>
  );
}
