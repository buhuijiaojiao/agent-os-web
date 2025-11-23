"use client";

import { useState } from "react";
import ChatSessionItem from "./ChatSessionItem";
import { Plus } from "lucide-react";

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
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">会话</h2>
        <button
          className="p-1 border rounded-md hover:bg-accent"
          onClick={createSession}
          title="新建会话"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

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
    </div>
  );
}
