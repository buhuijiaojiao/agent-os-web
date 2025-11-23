"use client";

import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatMessages({
  messages,
  typing,
}: {
  messages: { role: "user" | "agent"; content: string }[];
  typing: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <ScrollArea className="h-full w-full border rounded-md p-4 bg-gray-50 shadow-inner">
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
  );
}
