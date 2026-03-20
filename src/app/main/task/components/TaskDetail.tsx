"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Copy, Check, Wrench, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskRecord, ExecutionStepRecord } from "./TaskHistory";

interface TaskDetailProps {
  task: TaskRecord;
}

export function TaskDetail({ task }: TaskDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(task.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 任务输入 */}
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-xs font-medium text-muted-foreground mb-2">任务输入</h3>
        <p className="text-sm text-foreground/90 whitespace-pre-wrap">
          {task.input}
        </p>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span>
            {new Date(task.createdAt).toLocaleString("zh-CN")}
          </span>
          <span className={cn(
            "px-1.5 py-0.5 rounded",
            task.status === "success" ? "bg-[#4ef2c2]/20 text-[#4ef2c2]" : "bg-destructive/20 text-destructive"
          )}>
            {task.status === "success" ? "执行成功" : "执行失败"}
          </span>
          {task.totalDuration !== undefined && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(task.totalDuration)}
            </span>
          )}
        </div>
      </div>

      {/* 执行步骤 */}
      <div className="px-4 py-3 border-b border-border">
        <h3 className="text-xs font-medium text-muted-foreground mb-3">执行步骤</h3>
        <div className="space-y-2">
          {task.steps.map((step, index) => (
            <StepRecordItem key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* 执行结果 */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-muted-foreground">执行结果</h3>
          {task.result && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1 text-[#4ef2c2]" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  复制
                </>
              )}
            </Button>
          )}
        </div>

        {task.result ? (
          <div className="prose prose-sm max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-code:text-[#4ef2c2] prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {task.result}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">无执行结果</p>
        )}
      </div>
    </div>
  );
}

function StepRecordItem({ step, index }: { step: ExecutionStepRecord; index: number }) {
  const isTool = step.type === "tool";

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-2.5 rounded-lg",
        isTool ? "bg-[#4ef2c2]/5 border border-[#4ef2c2]/20" : "bg-muted/30"
      )}
    >
      {/* 状态图标 */}
      <div className={cn(
        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
        isTool ? "bg-[#4ef2c2]/20" : "bg-muted"
      )}>
        {isTool ? (
          <Wrench className="w-3 h-3 text-[#4ef2c2]" />
        ) : (
          <CheckCircle className="w-3 h-3 text-muted-foreground" />
        )}
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-medium",
            isTool ? "text-[#4ef2c2]" : "text-foreground/80"
          )}>
            {isTool ? `调用工具：${step.toolName}` : step.title}
          </span>
          <span className="text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          {step.duration !== undefined && (
            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" />
              {formatDuration(step.duration)}
            </span>
          )}
        </div>

        {/* 工具输入 */}
        {isTool && step.toolInput && (
          <div className="mt-1.5 px-2 py-1.5 rounded bg-muted/50 text-xs">
            <span className="text-muted-foreground">输入：</span>
            <span className="text-foreground ml-1">{step.toolInput}</span>
          </div>
        )}

        {/* 执行结果 */}
        {step.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {step.description}
          </p>
        )}
      </div>
    </div>
  );
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}
