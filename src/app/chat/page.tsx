"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { httpGet, httpPost } from "@/lib/http"; // ← 统一请求工具

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

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* 自动滚动到底部 */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* 发送消息 */
  async function sendMessage() {
    if (!input.trim() || typing) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTyping(true);

    try {
      // 🔥 调用代理api
      const reply = await httpGet<string>("api/proxy/chat"+"?userMessage=" + encodeURIComponent(input));
      const agentMessage: ChatMessage = {
        role: "agent",
        content: reply,
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: "（请求失败：" + err.message + "）",
        },
      ]);
    }

    setTyping(false);
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-4rem)] py-6 space-y-4">

      <h1 className="text-2xl font-bold">AI 聊天</h1>

      <ScrollArea className="flex-1 border rounded-md p-4 bg-gray-50 shadow-inner">
        <div className="space-y-6">

          {messages.map((m, idx) => (
            <ChatBubble key={idx} role={m.role} content={m.content} />
          ))}

          {typing && (
            <div className="flex items-center gap-2 text-gray-500 text-sm pl-1">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150" />
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300" />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="flex gap-3">
        <Input
          placeholder="输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>发送</Button>
      </div>
    </div>
  );
}

/* 气泡组件 */
function ChatBubble({
  role,
  content,
}: {
  role: "user" | "agent";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
          A
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] p-3 rounded-lg whitespace-pre-wrap text-sm shadow-sm",
          isUser
            ? "bg-black text-white ml-auto"
            : "bg-white border text-gray-900"
        )}
      >
        {content}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
          U
        </div>
      )}
    </div>
  );
}
