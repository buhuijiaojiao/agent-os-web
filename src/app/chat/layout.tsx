"use client";

import { useState } from "react";
import ChatConversationList from "./components/ChatConversationList";
import ChatConversationPanel from "./components/ChatConversationPanel";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);

  return (
    <div className="flex h-full min-h-0 bg-background rounded-xl border shadow-sm overflow-hidden">
      {/* 左侧 */}
      <aside className="w-64 shrink-0 border-r bg-muted/30 flex flex-col min-h-0 overflow-hidden">
        <ChatConversationList
          current={currentConversationId}
          onSelect={setCurrentConversationId}
        />
      </aside>

      {/* 右侧 */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {currentConversationId ? (
          <ChatConversationPanel conversationId={currentConversationId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            请选择一个会话
          </div>
        )}
      </div>
    </div>
  );
}
