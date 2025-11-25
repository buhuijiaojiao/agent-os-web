// app/chat/layout.tsx
import React from "react";
import ChatConversationList from "./components/ChatConversationList";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 父级 RootLayout 已经是 h-screen + overflow-hidden
    // 这里用 h-full/min-h-0 即可，避免双重高度控制
    <div className="flex h-full min-h-0 bg-background rounded-xl border shadow-sm overflow-hidden">
      {/* 左：会话列表 */}
      <aside className="w-64 shrink-0 border-r bg-muted/30 flex flex-col min-h-0 overflow-hidden">
        <ChatConversationList />
      </aside>

      {/* 右：聊天内容区域（交给 page.tsx 再细分垂直结构） */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
