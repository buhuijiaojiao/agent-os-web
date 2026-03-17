// app/chat/components/ChatMessages.tsx
"use client";

import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessagesProps {
  messages: { id: number; role: "user" | "assistant"; content: string }[];
  typing: boolean;
}

export default function ChatMessages({ messages, typing }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <ScrollArea className="h-full w-full">
      <div className="px-4 py-4 space-y-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} role={m.role} content={m.content} />
        ))}

        {typing && (
          <div className="flex items-center gap-2 pl-10">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ef2c2] animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ef2c2] animate-bounce delay-150" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ef2c2] animate-bounce delay-300" />
            </div>
            <span className="text-xs text-white/40">thinking</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
