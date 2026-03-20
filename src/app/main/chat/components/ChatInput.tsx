// app/chat/components/ChatInput.tsx
"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (msg: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const send = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <div
      className="
        relative flex items-center gap-3 px-4 py-3
        rounded-xl border border-border
        bg-muted/50
        backdrop-blur
      "
    >
      {/* glow */}
      <div
        className="
            pointer-events-none
            absolute inset-0 opacity-0 focus-within:opacity-100
            transition
            bg-[radial-gradient(circle_at_center,rgba(78,242,194,0.15),transparent_70%)]
          "
      />

      <input
        className="
          flex-1 bg-transparent outline-none text-sm text-foreground
          placeholder:text-muted-foreground
        "
        placeholder="Ask anything..."
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />

      <button
        onClick={send}
        disabled={disabled}
        className="
          text-xs px-3 py-1.5 rounded-md
          bg-[#4ef2c2]/20 text-[#4ef2c2]
          hover:bg-[#4ef2c2]/30
          transition
        "
      >
        Send
      </button>
    </div>
  );
}
