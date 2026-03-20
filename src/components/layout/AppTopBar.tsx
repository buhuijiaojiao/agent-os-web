// AppTopBar.tsx
"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export function AppTopBar() {
  return (
    <header className="h-14 px-6 flex items-center justify-between text-sm text-foreground">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-foreground/80 font-medium tracking-tight">
          Agent Workspace
        </span>

        <span className="text-foreground/30">/</span>

        <span className="text-muted-foreground">Session</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* theme toggle */}
        <ThemeToggle />

        {/* divider */}
        <div className="w-px h-4 bg-border" />

        {/* system status */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-[#4ef2c2] animate-pulse" />
          <span>AI Online</span>
        </div>

        {/* divider */}
        <div className="w-px h-4 bg-border" />

        {/* env */}
        <span className="text-muted-foreground">beta</span>
      </div>
    </header>
  );
}
