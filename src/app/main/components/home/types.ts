// 首页组件类型定义

import type { LucideIcon } from "lucide-react";

export interface StatItem {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: string;
}

export type ActivityType = "chat" | "task" | "agent";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  time: string;
  href: string;
}

export interface ActivityTypeConfig {
  label: string;
  color: string;
}

export const activityTypeConfig: Record<ActivityType, ActivityTypeConfig> = {
  chat: { label: "对话", color: "text-blue-400" },
  task: { label: "任务", color: "text-amber-400" },
  agent: { label: "Agent", color: "text-purple-400" },
};
