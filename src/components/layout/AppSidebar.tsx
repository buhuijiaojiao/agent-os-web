// AppSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Book, LibraryBig, Bot, Logs } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  const nav = [
    { label: "Home", href: "/main", icon: Home },
    { label: "Chat", href: "/main/chat", icon: MessageSquare },
    { label: "Agent Hub", href: "/main/agent-hub", icon: Bot },
    { label: "Blog", href: "/main/blog", icon: Book },
    { label: "Log", href: "/main/log", icon: Logs },
    { label: "Knowledge", href: "/main/knowledge-base", icon: LibraryBig },
  ];

  return (
    <aside className="h-full flex flex-col px-3 py-4 text-white">
      {/* Logo */}
      <div className="px-3 mb-6">
        <div className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4ef2c2] animate-pulse" />
          Agent OS
        </div>
        <div className="text-xs text-white/40 mt-1">cognitive workspace</div>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm",
                "transition-all duration-300",

                active ? "text-white" : "text-white/50 hover:text-white",
              )}
            >
              {/* active indicator */}
              <div
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full transition-all",
                  active
                    ? "bg-[#4ef2c2]"
                    : "bg-transparent group-hover:bg-white/20",
                )}
              />

              {/* icon */}
              <Icon
                className={cn(
                  "w-4 h-4 transition",
                  active
                    ? "text-[#4ef2c2]"
                    : "text-white/40 group-hover:text-white",
                )}
              />

              {/* label */}
              <span className="tracking-tight">{item.label}</span>

              {/* hover glow */}
              <div
                className="
                  absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
                  transition duration-300
                  bg-[radial-gradient(circle_at_left,rgba(78,242,194,0.12),transparent_60%)]
                "
              />
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Footer */}
      <div className="px-3 pt-4 border-t border-white/10 text-xs text-white/40">
        v0.1.0
      </div>
    </aside>
  );
}