"use client";

import { useState } from "react";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { httpPost } from "@/lib/http";

interface ChatMessage {
  role: "user" | "agent";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "agent",
      content: "你好，我是你的个人智能助手。我在这里随时为你服务。",
    },
  ]);
  const [typing, setTyping] = useState(false);

  const sessionId = "demo-session"; // 先用固定值；接数据库后替换为选中的会话ID

  async function sendMessage(content: string) {
    setMessages((prev) => [...prev, { role: "user", content }]);
    setTyping(true);

    try {
      const reply = await httpPost<string>("/api/proxy/chat", {
        sessionId,
        userMessage: content,
      });
      setMessages((prev) => [...prev, { role: "agent", content: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: `（请求失败：${err.message}）` },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-full px-6 py-6 space-y-4 overflow-hidden">
      <h1 className="text-2xl font-bold">聊天</h1>

      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} typing={typing} />
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
