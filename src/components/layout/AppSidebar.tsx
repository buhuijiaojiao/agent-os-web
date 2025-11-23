"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Book, LayoutDashboard, Settings } from "lucide-react";

export function AppSidebar() {
  const nav = [
    { label: "Home", href: "/", icon: Home },
    { label: "Chat", href: "/chat", icon: MessageSquare },
    { label: "Blog", href: "/blog", icon: Book },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 w-60 border-r bg-sidebar text-sidebar-foreground",
        "flex flex-col py-6 px-3 z-40"
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

      {/* 未来可以放：用户头像、状态、版本号 */}
      <div className="px-3 text-xs text-muted-foreground">
        v0.1.0
      </div>
    </aside>
  );
}
