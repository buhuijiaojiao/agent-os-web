// AppSidebar.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Book, LibraryBig, Bot, Logs } from "lucide-react";

export function AppSidebar() {
  const nav = [
    { label: "Home", href: "/", icon: Home },
    { label: "Chat", href: "/chat", icon: MessageSquare },
    { label: "Agent-Hub", href: "/agent-hub", icon: Bot },
    { label: "Blog", href: "/blog", icon: Book },
    { label: "Log", href: "/log", icon: Logs },
    { label: "Knowledge-Base", href: "/knowledge-base", icon: LibraryBig },
    { label: "Login(获取token)", href: "/login", icon: Logs },
  ];

  return (
    <aside
      className={cn(
        "w-60 border-r bg-sidebar text-sidebar-foreground",
        "flex flex-col py-6 px-3"
      )}
    >
      <div className="text-xl font-semibold px-3 mb-6">Agent OS</div>

      <nav className="space-y-2">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <div className="px-3 text-xs text-muted-foreground">v0.1.0</div>
    </aside>
  );
}
