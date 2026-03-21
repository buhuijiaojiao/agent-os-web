"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Clock, Wrench } from "lucide-react";
import type { TaskRecord, ExecutionStepRecord, StepType } from "@/types/task";

export type { TaskRecord, ExecutionStepRecord, StepType };

interface TaskHistoryProps {
  tasks: TaskRecord[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function TaskHistory({ tasks, selectedId, onSelect }: TaskHistoryProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Clock className="w-8 h-8 mb-3 opacity-50" />
        <p className="text-sm">暂无历史任务</p>
        <p className="text-xs mt-1">执行的任务将在此显示</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskHistoryItem
          key={task.id}
          task={task}
          isSelected={task.id === selectedId}
          onClick={() => onSelect(task.id)}
        />
      ))}
    </div>
  );
}

interface TaskHistoryItemProps {
  task: TaskRecord;
  isSelected: boolean;
  onClick: () => void;
}

function TaskHistoryItem({ task, isSelected, onClick }: TaskHistoryItemProps) {
  const truncatedInput = task.input.length > 50
    ? task.input.slice(0, 50) + "..."
    : task.input;

  const toolCount = task.steps.filter(s => s.type === "tool").length;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-lg transition-all",
        "border border-transparent",
        isSelected
          ? "bg-[#4ef2c2]/10 border-[#4ef2c2]/30"
          : "bg-muted/30 hover:bg-muted/50"
      )}
    >
      {/* 状态和工具数量 */}
      <div className="flex items-center gap-2 mb-1.5">
        {task.status === "success" ? (
          <CheckCircle className="w-3.5 h-3.5 text-[#4ef2c2]" />
        ) : (
          <XCircle className="w-3.5 h-3.5 text-destructive" />
        )}
        {toolCount > 0 && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-[#4ef2c2]/20 text-[#4ef2c2] flex items-center gap-1">
            <Wrench className="w-3 h-3" />
            {toolCount}
          </span>
        )}
        {task.totalDuration !== undefined && (
          <span className="text-xs text-muted-foreground">
            {formatDuration(task.totalDuration)}
          </span>
        )}
      </div>

      {/* 任务输入 */}
      <p className="text-sm text-foreground/80 line-clamp-2">
        {truncatedInput}
      </p>

      {/* 时间 */}
      <p className="text-xs text-muted-foreground mt-2">
        {formatTime(task.createdAt)}
      </p>
    </button>
  );
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return minutes <= 1 ? "刚刚" : `${minutes} 分钟前`;
  }

  if (date.toDateString() === now.toDateString()) {
    return `今天 ${date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;
  }

  return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" }) +
    ` ${date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}
