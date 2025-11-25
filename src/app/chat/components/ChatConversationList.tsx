// app/chat/components/ChatConversationList.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import ChatConversationItem from "./ChatConversationItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  title: string;
}

export default function ChatConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "default", title: "默认会话" },
  ]);
  const [current, setCurrent] = useState("default");

  function createConversation() {
    //点击新建会话按钮逻辑
    const id = crypto.randomUUID();
    setConversations((prev) => [...prev, { id, title: "新建会话" }]);
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
          onClick={createConversation}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* 列表滚动区域 */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-2">
          {conversations.map((c) => (
            <ChatConversationItem
              key={c.id}
              conversation={c}
              active={c.id === current}
              onClick={() => setCurrent(c.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
