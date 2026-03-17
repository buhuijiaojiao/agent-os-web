// AppTopBar.tsx
"use client";

export function AppTopBar() {
  return (
    <header className="h-14 px-6 flex items-center justify-between text-sm text-white">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-white/80 font-medium tracking-tight">
          Agent Workspace
        </span>

        <span className="text-white/30">/</span>

        <span className="text-white/40">Session</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* system status */}
        <div className="flex items-center gap-2 text-white/50">
          <div className="w-2 h-2 rounded-full bg-[#4ef2c2] animate-pulse" />
          <span>AI Online</span>
        </div>

        {/* divider */}
        <div className="w-px h-4 bg-white/10" />

        {/* env */}
        <span className="text-white/40">beta</span>
      </div>
    </header>
  );
}
