// app/chat/components/ChatSessionList.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ChatSessionItem from "./ChatSessionItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function ChatSessionList() {
  const [sessions, setSessions] = useState([
    { id: "default", title: "默认会话" },
  ]);
  const [current, setCurrent] = useState("default");

  function createSession() {
    const id = crypto.randomUUID();
    setSessions((prev) => [...prev, { id, title: "新建会话" }]);
    setCurrent(id);
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* 顶部固定区域 */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40">
        <h2 className="text-sm font-semibold">历史</h2>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7"
          onClick={createSession}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* 列表滚动区域 */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-2">
          {sessions.map((s) => (
            <ChatSessionItem
              key={s.id}
              session={s}
              active={s.id === current}
              onClick={() => setCurrent(s.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
