"use client";

import { useState } from "react";
import ChatConversationList from "./components/ChatConversationList";
import ChatConversationPanel from "./components/ChatConversationPanel";

export default function ChatLayout() {
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);

  return (
    <div className="relative flex h-full min-h-0 overflow-hidden">
      {/* 🌌 subtle background */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_30%_20%,rgba(78,242,194,0.06),transparent_40%)]
        "
      />

      {/* 左侧：Conversation Rail */}
      <aside
        className="
          w-[280px] shrink-0
          border-r border-white/10
          bg-[#0f1115]/80 backdrop-blur-xl
          flex flex-col min-h-0
        "
      >
        <ChatConversationList
          current={currentConversationId}
          onSelect={setCurrentConversationId}
        />
      </aside>

      {/* 右侧：Conversation Stage */}
      <div className="flex-1 min-w-0 flex flex-col relative">
        {currentConversationId ? (
          <ChatConversationPanel conversationId={currentConversationId} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* glow */}
      <div
        className="
          absolute w-[400px] h-[400px] rounded-full
          bg-[#4ef2c2]/10 blur-3xl
        "
      />

      <div className="relative text-center space-y-4">
        <h2 className="text-xl font-medium tracking-tight text-white/90">
          Start a conversation
        </h2>

        <p className="text-sm text-white/40 max-w-sm mx-auto">
          Your AI remembers context, adapts to your thinking, and evolves with
          you.
        </p>

        <div className="text-xs text-white/30">
          Select a thread or create a new one
        </div>
      </div>
    </div>
  );
}