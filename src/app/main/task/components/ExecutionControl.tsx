"use client";

import { cn } from "@/lib/utils";
import { Zap, Compass, Hand } from "lucide-react";
import type { ExecutionControlMode } from "@/types/task";

export type { ExecutionControlMode };

interface ExecutionControlProps {
  mode: ExecutionControlMode;
  onChange: (mode: ExecutionControlMode) => void;
  disabled?: boolean;
}

const modes: Array<{
  value: ExecutionControlMode;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    value: "autonomous",
    label: "Autonomous",
    description: "全自动执行",
    icon: Zap,
  },
  {
    value: "guided",
    label: "Guided",
    description: "引导式执行",
    icon: Compass,
  },
  {
    value: "manual",
    label: "Manual",
    description: "手动执行",
    icon: Hand,
  },
];

export function ExecutionControl({ mode, onChange, disabled }: ExecutionControlProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/30">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.value;

        return (
          <button
            key={m.value}
            onClick={() => onChange(m.value)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            title={m.description}
          >
            <Icon className={cn(
              "w-3.5 h-3.5",
              isActive && m.value === "autonomous" && "text-[#4ef2c2]",
              isActive && m.value === "guided" && "text-amber-500",
              isActive && m.value === "manual" && "text-blue-400"
            )} />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function ExecutionModeDescription({ mode }: { mode: ExecutionControlMode }) {
  const descriptions: Record<ExecutionControlMode, string> = {
    autonomous: "所有步骤自动执行，无需确认",
    guided: "工具调用需要确认，其他步骤自动执行",
    manual: "每一步都需要手动确认后执行",
  };

  return (
    <p className="text-xs text-muted-foreground mt-1">
      {descriptions[mode]}
    </p>
  );
}
