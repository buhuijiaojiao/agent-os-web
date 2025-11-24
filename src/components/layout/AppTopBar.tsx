// AppTopBar.tsx
"use client";

export function AppTopBar() {
  return (
    <header className="border-b bg-background">
      <div className="h-14 px-6 flex items-center justify-between">
        <div className="font-medium">Agent Workspace</div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="opacity-60">beta</span>
        </div>
      </div>
    </header>
  );
}
