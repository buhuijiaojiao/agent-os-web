import React from "react";
import ChatSessionList from "./components/ChatSessionList";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* 左侧：会话列表 */}
      <aside className="w-64 shrink-0 border-r bg-card">
        <ChatSessionList />
      </aside>

      {/* 右侧：聊天内容 */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
