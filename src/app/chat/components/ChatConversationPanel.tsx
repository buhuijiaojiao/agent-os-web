"use client";

import { useEffect, useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { httpGet, httpPost } from "@/lib/http";

interface RawMessage {
  id: number;
  senderType: number; // 1=user, 2=assistant
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

  /** 加载历史消息 */
  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  async function loadMessages() {
    const data = await httpGet<RawMessage[]>(
      `/api/proxy/message/list?conversationId=${conversationId}`
    );

    const mapped: Message[] = data.map((m) => ({
      id: m.id,
      role: m.senderType === 1 ? "user" : "assistant",
      content: m.content,
    }));

    setMessages(mapped);
  }

  /** 发送消息 */
  async function sendMessage(content: string) {
    
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <header className="px-6 py-3 border-b border-border bg-background/80 backdrop-blur">
        <h1 className="text-xl font-semibold">Chat</h1>
      </header>

      {/* Messages */}
      <div className="flex-1 min-h-0">
        <ChatMessages messages={messages} typing={typing} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 bg-background">
        <ChatInput onSend={sendMessage} disabled={typing} />
      </div>
    </div>
  );
}
