// AppSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Book, LibraryBig, Bot, Logs, Terminal, PanelLeftClose, PanelLeft } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function AppSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebar();

  const nav = [
    { label: "Home", href: "/main", icon: Home },
    { label: "Chat", href: "/main/chat", icon: MessageSquare },
    { label: "Task", href: "/main/task", icon: Terminal },
    { label: "Agent Hub", href: "/main/agent-hub", icon: Bot },
    { label: "Blog", href: "/main/blog", icon: Book },
    { label: "Log", href: "/main/log", icon: Logs },
    { label: "Knowledge", href: "/main/knowledge-base", icon: LibraryBig },
  ];

  // Toggle 按钮
  const ToggleButton = () => (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center justify-center",
        "w-8 h-8 rounded-lg",
        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "transition-colors duration-200"
      )}
      aria-label={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
    >
      {isCollapsed ? (
        <PanelLeft className="w-4 h-4" />
      ) : (
        <PanelLeftClose className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <aside className="h-full flex flex-col text-foreground">
      {/* Header - 固定高度 */}
      <div className="h-14 px-3 flex items-center border-b border-border/50">
        {isCollapsed ? (
          /* 折叠态：按钮居中 */
          <div className="w-full flex justify-center">
            <ToggleButton />
          </div>
        ) : (
          /* 展开态：Logo 左侧 + 按钮右侧 */
          <>
            <span className="text-base font-semibold tracking-tight whitespace-nowrap">
              Agent OS
            </span>
            <div className="flex-1" />
            <ToggleButton />
          </>
        )}
      </div>

      {/* Nav - 图标位置固定 */}
      <nav className="flex-1 py-2 px-2 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          const linkContent = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center h-10 rounded-lg text-sm",
                "transition-colors duration-200",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {/* 图标容器 - 固定宽度 */}
              <div className="w-[52px] flex items-center justify-center shrink-0">
                {/* active indicator */}
                <div
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full transition-colors",
                    active
                      ? "bg-[#4ef2c2]"
                      : "bg-transparent group-hover:bg-border",
                  )}
                />

                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    active
                      ? "text-[#4ef2c2]"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
              </div>

              {/* label - 展开时显示 */}
              <div
                className={cn(
                  "flex-1 overflow-hidden",
                  "transition-all duration-300 ease-in-out",
                  isCollapsed ? "opacity-0 max-w-0 ml-0" : "opacity-100 max-w-[200px] ml-1"
                )}
              >
                <span className="whitespace-nowrap tracking-tight">
                  {item.label}
                </span>
              </div>

              {/* hover glow */}
              <div
                className={cn(
                  "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10",
                  isCollapsed
                    ? "bg-[radial-gradient(circle,rgba(78,242,194,0.12),transparent_70%)]"
                    : "bg-[radial-gradient(circle_at_left,rgba(78,242,194,0.12),transparent_60%)]"
                )}
              />
            </Link>
          );

          // 折叠状态下显示 Tooltip
          if (isCollapsed) {
            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  {linkContent}
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      {/* Footer - 展开时显示 */}
      <div
        className={cn(
          "px-4 flex items-center border-t border-border/50 text-xs text-muted-foreground",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isCollapsed ? "opacity-0 h-0 py-0" : "opacity-100 h-10 py-2"
        )}
      >
        v0.1.0
      </div>
    </aside>
  );
}
