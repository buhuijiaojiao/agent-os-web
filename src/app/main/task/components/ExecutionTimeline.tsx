"use client";

import { cn } from "@/lib/utils";
import { Check, Loader2, Circle, Wrench, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExecutionStep, StepStatus, StepType } from "@/types/task";

export type { ExecutionStep, StepStatus, StepType };

interface ExecutionTimelineProps {
  steps: ExecutionStep[];
  onContinue?: (stepId: string) => void;
}

export function ExecutionTimeline({ steps, onContinue }: ExecutionTimelineProps) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <StepItem
          key={step.id}
          step={step}
          index={index}
          onContinue={onContinue}
        />
      ))}
    </div>
  );
}

function StepItem({
  step,
  index,
  onContinue
}: {
  step: ExecutionStep;
  index: number;
  onContinue?: (stepId: string) => void;
}) {
  const isTool = step.type === "tool";

  return (
    <div
      className={cn(
        "relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300",
        step.status === "running" && isTool && "bg-[#4ef2c2]/10 border border-[#4ef2c2]/30",
        step.status === "running" && !isTool && "bg-primary/5 border border-primary/20",
        step.status === "waiting" && "bg-amber-500/10 border border-amber-500/30",
        step.status === "done" && isTool && "bg-[#4ef2c2]/5 border border-[#4ef2c2]/20",
        step.status === "done" && !isTool && "bg-muted/50",
        step.status === "pending" && "opacity-50"
      )}
    >
      {/* 左侧状态指示器 */}
      <div className="flex-shrink-0 mt-0.5">
        <StepIcon status={step.status} isTool={isTool} />
      </div>

      {/* 内容区域 */}
      <div className="flex-1 min-w-0">
        {isTool ? (
          <ToolStepContent step={step} />
        ) : (
          <ThinkingStepContent step={step} />
        )}

        {/* Waiting 状态的 Continue 按钮 */}
        {step.status === "waiting" && onContinue && (
          <div className="mt-3">
            <Button
              size="sm"
              onClick={() => onContinue(step.id)}
              className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border border-amber-500/30"
            >
              <ArrowRight className="w-4 h-4 mr-1.5" />
              Continue
            </Button>
          </div>
        )}
      </div>

      {/* 右侧：序号 + 耗时 */}
      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <span className="text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        {step.status === "done" && step.duration !== undefined && (
          <DurationDisplay duration={step.duration} />
        )}
      </div>
    </div>
  );
}

function ThinkingStepContent({ step }: { step: ExecutionStep }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-medium text-sm",
            step.status === "running" && "text-primary",
            step.status === "waiting" && "text-amber-500",
            step.status === "done" && "text-foreground",
            step.status === "pending" && "text-muted-foreground"
          )}
        >
          {step.title}
        </span>
        {step.status === "running" && (
          <span className="text-xs text-primary/70 animate-pulse">
            处理中...
          </span>
        )}
        {step.status === "waiting" && (
          <span className="text-xs text-amber-500/80">
            等待确认
          </span>
        )}
      </div>
      {step.description && (
        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
      )}
    </div>
  );
}

function ToolStepContent({ step }: { step: ExecutionStep }) {
  return (
    <div className="space-y-2">
      {/* 工具标题 */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-medium text-sm flex items-center gap-1.5",
            step.status === "running" && "text-[#4ef2c2]",
            step.status === "waiting" && "text-amber-500",
            step.status === "done" && "text-[#4ef2c2]",
            step.status === "pending" && "text-muted-foreground"
          )}
        >
          <Wrench className="w-3.5 h-3.5" />
          调用工具：{step.toolName || step.title}
        </span>
        {step.status === "running" && (
          <span className="text-xs text-[#4ef2c2]/70 animate-pulse">
            执行中...
          </span>
        )}
        {step.status === "waiting" && (
          <span className="text-xs text-amber-500/80">
            等待确认
          </span>
        )}
      </div>

      {/* 工具输入参数 */}
      {step.toolInput && (
        <div
          className={cn(
            "ml-5 px-3 py-2 rounded-lg text-xs",
            "bg-muted/50 border border-border",
            step.status === "running" && "border-[#4ef2c2]/30",
            step.status === "waiting" && "border-amber-500/30"
          )}
        >
          <span className="text-muted-foreground">输入：</span>
          <span className="text-foreground ml-1">{step.toolInput}</span>
        </div>
      )}

      {/* 工具输出（已完成时显示） */}
      {step.status === "done" && step.description && (
        <div className="ml-5 px-3 py-2 rounded-lg text-xs bg-[#4ef2c2]/10 border border-[#4ef2c2]/20">
          <span className="text-[#4ef2c2]">✓</span>
          <span className="text-muted-foreground ml-2">{step.description}</span>
        </div>
      )}
    </div>
  );
}

function StepIcon({ status, isTool }: { status: StepStatus; isTool: boolean }) {
  const iconColor = status === "waiting"
    ? "text-amber-500"
    : isTool
      ? "text-[#4ef2c2]"
      : "text-primary";
  const bgColor = status === "waiting"
    ? "bg-amber-500/20"
    : isTool
      ? "bg-[#4ef2c2]/20"
      : "bg-primary/20";

  if (status === "done") {
    return (
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", bgColor)}>
        <Check className={cn("w-3.5 h-3.5", iconColor)} />
      </div>
    );
  }

  if (status === "running") {
    return (
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", bgColor)}>
        <Loader2 className={cn("w-3.5 h-3.5 animate-spin", iconColor)} />
      </div>
    );
  }

  if (status === "waiting") {
    return (
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", bgColor)}>
        <Clock className={cn("w-3.5 h-3.5", iconColor)} />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center">
      <Circle className="w-2 h-2 text-muted-foreground" />
    </div>
  );
}

function DurationDisplay({ duration }: { duration: number }) {
  const formatted = duration < 1000
    ? `${Math.round(duration)}ms`
    : `${(duration / 1000).toFixed(1)}s`;

  return (
    <span className="text-xs text-muted-foreground flex items-center gap-1">
      <Clock className="w-3 h-3" />
      {formatted}
    </span>
  );
}
