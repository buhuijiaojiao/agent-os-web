// AppSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Book, LibraryBig, Bot, Logs, Terminal, ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <aside className="h-full flex flex-col py-4 text-foreground">
      {/* Logo */}
      <div className={cn(
        "px-3 mb-6 transition-all duration-300",
        isCollapsed ? "flex justify-center" : ""
      )}>
        <div className={cn(
          "font-semibold tracking-tight flex items-center gap-2",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="w-2 h-2 rounded-full bg-[#4ef2c2] animate-pulse shrink-0" />
          {!isCollapsed && <span className="text-lg">Agent OS</span>}
        </div>
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground mt-1 ml-4">
            cognitive workspace
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="space-y-1 px-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          const linkContent = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm",
                "transition-all duration-300",
                isCollapsed && "justify-center px-0",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {/* active indicator */}
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full transition-all",
                  isCollapsed ? "left-0" : "left-0",
                  active
                    ? "bg-[#4ef2c2]"
                    : "bg-transparent group-hover:bg-border",
                )}
              />

              {/* icon */}
              <Icon
                className={cn(
                  "w-4 h-4 transition shrink-0",
                  active
                    ? "text-[#4ef2c2]"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />

              {/* label */}
              {!isCollapsed && (
                <span className="tracking-tight">{item.label}</span>
              )}

              {/* hover glow */}
              <div
                className={cn(
                  "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100",
                  "transition duration-300",
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

      <div className="flex-1" />

      {/* Toggle Button */}
      <div className={cn(
        "px-2 border-t border-border pt-3",
        isCollapsed ? "flex justify-center" : ""
      )}>
        <button
          onClick={toggle}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg",
            "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            "transition-all duration-300",
            isCollapsed && "justify-center px-0"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">收起</span>
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="px-5 pt-2 text-xs text-muted-foreground">
          v0.1.0
        </div>
      )}
    </aside>
  );
}
