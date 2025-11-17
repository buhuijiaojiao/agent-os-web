"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "agent", content: "你好，我是你的个人智能助手。" },
  ]);
  const [input, setInput] = useState("");

  function appendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      // 这里暂时用静态回复（之后接入你的Java服务）
      { role: "agent", content: "（这里将显示 AI 的回复）" },
    ]);

    setInput("");
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-4rem)] flex flex-col py-6">
      <h1 className="text-2xl font-bold mb-4">AI 聊天</h1>

      {/* 聊天窗口 */}
      <ScrollArea className="flex-1 border rounded-md p-4 bg-gray-50">
        <div className="space-y-6">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Agent 气泡 */}
              {m.role === "agent" && (
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                  A
                </div>
              )}

              <div
                className={`max-w-[75%] p-3 rounded-lg whitespace-pre-wrap text-sm shadow-sm 
                  ${
                    m.role === "user"
                      ? "bg-black text-white"
                      : "bg-white border"
                  }`}
              >
                {m.content}
              </div>

              {/* User 气泡 */}
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  U
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* 输入栏 */}
      <div className="flex gap-3 mt-4">
        <Input
          placeholder="输入消息..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && appendMessage()}
        />
        <Button onClick={appendMessage}>发送</Button>
      </div>
    </div>
  );
}
