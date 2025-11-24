// app/chat/page.tsx
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

  const sessionId = "demo-session";

  async function sendMessage(content: string) {
    if (!content.trim()) return;

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
    // 继承 layout 的高度，内部再做垂直布局
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border bg-background/80 backdrop-blur">
        <h1 className="text-xl font-semibold">Chat</h1>
      </header>

      {/* Body：消息区域，自己滚动 */}
      <div className="flex-1 min-h-0">
        <ChatMessages messages={messages} typing={typing} />
      </div>

      {/* Footer：输入框固定在底部 */}
      <div className="border-t border-border p-4 bg-background">
        <ChatInput onSend={sendMessage} disabled={typing} />
      </div>
    </div>
  );
}
