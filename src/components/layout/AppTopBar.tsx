"use client";

export function AppTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/70 dark:bg-black/40 backdrop-blur-md">
      <div className="h-14 px-6 flex items-center justify-between">
        <div className="font-medium">Agent Workspace</div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {/* 未来你可以放：搜索、切换模型、用户头像等 */}
          <span className="opacity-60">beta</span>
        </div>
      </div>
    </header>
  );
}
