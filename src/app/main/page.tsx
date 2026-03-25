"use client";

import { MessageSquare, Bot, Terminal, LibraryBig } from "lucide-react";
import { StatCard } from "./components/home/StatCard";
import { RecentActivity } from "./components/home/RecentActivity";
import type { StatItem, ActivityItem } from "./components/home/types";

// Mock 数据
const mockStats: StatItem[] = [
  { icon: MessageSquare, label: "对话", value: 128, trend: "+12" },
  { icon: Bot, label: "Agent", value: 8, trend: "+2" },
  { icon: Terminal, label: "任务", value: 45, trend: "+5" },
  // { icon: LibraryBig, label: "知识库", value: 12, trend: "+1" },
];

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "chat",
    title: "产品需求讨论",
    description: "关于新功能的技术方案",
    time: "10分钟前",
    href: "/main/chat",
  },
  {
    id: "2",
    type: "task",
    title: "生成周报",
    description: "自动汇总本周工作内容",
    time: "1小时前",
    href: "/main/task",
  },
  {
    id: "3",
    type: "agent",
    title: "数据分析助手",
    description: "已启用 · 3个工具绑定",
    time: "3小时前",
    href: "/main/agent-hub",
  },
  {
    id: "4",
    type: "chat",
    title: "代码审查建议",
    description: "PR #42 的审查反馈",
    time: "昨天",
    href: "/main/chat",
  },
  {
    id: "5",
    type: "task",
    title: "API 文档生成",
    description: "基于代码注释自动生成",
    time: "昨天",
    href: "/main/task",
  },
];

// 获取当前日期
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return "夜深了";
  if (hour < 12) return "早上好";
  if (hour < 14) return "中午好";
  if (hour < 18) return "下午好";
  return "晚上好";
}

function formatDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return now.toLocaleDateString("zh-CN", options);
}

export default function HomePage() {
  return (
    <div className="relative space-y-8">
      {/* 背景网格 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]
                      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                      [background-size:40px_40px]"
      />

      {/* 欢迎区域 */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {getGreeting()}，欢迎回来
        </h1>
        <p className="text-muted-foreground">{formatDate()}</p>
      </section>

      {/* 统计卡片 */}
      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          概览
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* 最近活动 */}
      <section>
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          最近活动
        </h2>
        <RecentActivity activities={mockActivities} />
      </section>
    </div>
  );
}
