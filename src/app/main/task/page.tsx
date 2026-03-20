"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExecutionTimeline, ExecutionStep } from "./components/ExecutionTimeline";
import { TaskResult } from "./components/TaskResult";
import { TaskHistory, TaskRecord, ExecutionStepRecord } from "./components/TaskHistory";
import { TaskDetail } from "./components/TaskDetail";
import { ExecutionControl, ExecutionControlMode, ExecutionModeDescription } from "./components/ExecutionControl";
import { Play, RotateCcw, AlertCircle, History, Plus, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "task_history";

type TaskStatus = "idle" | "running" | "success" | "error";
type ViewMode = "new" | "detail";

// 创建步骤模板
const createSteps = (): ExecutionStep[] => [
  { id: "1", title: "理解任务", type: "thinking", status: "pending", description: "分析任务目标和需求" },
  { id: "2", title: "规划报告结构", type: "thinking", status: "pending", description: "设计输出框架" },
  { id: "3", title: "Web Search", type: "tool", status: "pending", toolName: "Web Search", toolInput: "AI 行业趋势 2025" },
  { id: "4", title: "Database Query", type: "tool", status: "pending", toolName: "Database Query", toolInput: "用户增长数据 2024-2025" },
  { id: "5", title: "生成报告内容", type: "thinking", status: "pending", description: "整合信息生成报告" },
  { id: "6", title: "优化润色", type: "thinking", status: "pending", description: "检查并优化输出质量" },
];

// 工具执行结果
const toolResults: Record<string, string> = {
  "3": "找到 15 篇相关报告，提取关键数据",
  "4": "查询到 12,450 条用户增长记录",
};

// localStorage 操作
function loadTaskHistory(): TaskRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTaskHistory(tasks: TaskRecord[]) {
  if (typeof window === "undefined") return;
  try {
    const trimmed = tasks.slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.error("保存任务历史失败:", err);
  }
}

// 格式化耗时
function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export default function TaskPage() {
  const [taskInput, setTaskInput] = useState("");
  const [status, setStatus] = useState<TaskStatus>("idle");
  const [steps, setSteps] = useState<ExecutionStep[]>(createSteps);
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 执行控制模式
  const [controlMode, setControlMode] = useState<ExecutionControlMode>("guided");

  // 历史记录状态
  const [viewMode, setViewMode] = useState<ViewMode>("new");
  const [taskHistory, setTaskHistory] = useState<TaskRecord[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // 执行控制
  const executionRef = useRef<{
    currentIndex: number;
    steps: ExecutionStep[];
    startTime: number;
    resolve: (() => void) | null;
  }>({
    currentIndex: 0,
    steps: [],
    startTime: 0,
    resolve: null,
  });

  // 加载历史记录
  useEffect(() => {
    setTaskHistory(loadTaskHistory());
  }, []);

  const isRunning = status === "running";
  const isDisabled = isRunning || !taskInput.trim();
  const selectedTask = taskHistory.find(t => t.id === selectedTaskId);

  // 判断步骤是否需要等待确认
  const needsConfirmation = useCallback((step: ExecutionStep, mode: ExecutionControlMode): boolean => {
    if (mode === "autonomous") return false;
    if (mode === "manual") return true;
    // guided: 只有 tool 类型需要确认
    return step.type === "tool";
  }, []);

  // 执行单个步骤
  const executeStep = useCallback(async (step: ExecutionStep): Promise<ExecutionStep> => {
    const startTime = Date.now();
    const baseTime = step.type === "tool" ? 2000 : 1200;
    await new Promise((resolve) => setTimeout(resolve, baseTime + Math.random() * 800));
    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
      ...step,
      status: "done" as const,
      startTime,
      endTime,
      duration,
      description: step.type === "tool" && toolResults[step.id]
        ? toolResults[step.id]
        : step.description,
    };
  }, []);

  // 处理 Continue 点击
  const handleContinue = useCallback(async (stepId: string) => {
    const stepIndex = executionRef.current.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;

    // 执行该步骤
    const step = executionRef.current.steps[stepIndex];
    const executedStep = await executeStep(step);

    // 更新步骤状态
    executionRef.current.steps[stepIndex] = executedStep;
    setSteps([...executionRef.current.steps]);

    // 继续执行下一步
    executionRef.current.currentIndex = stepIndex + 1;
    runNextStep();
  }, [executeStep]);

  // 运行下一个步骤
  const runNextStep = useCallback(async () => {
    const { currentIndex, steps: currentSteps } = executionRef.current;

    // 检查是否完成
    if (currentIndex >= currentSteps.length) {
      // 生成结果
      const mockResult = generateMockResult();
      setResult(mockResult);
      setStatus("success");

      // 保存到历史记录
      const totalDuration = Date.now() - executionRef.current.startTime;
      const recordSteps: ExecutionStepRecord[] = currentSteps.map(s => ({
        id: s.id,
        title: s.title,
        type: s.type,
        status: "done" as const,
        toolName: s.toolName,
        toolInput: s.toolInput,
        description: s.description,
        duration: s.duration,
      }));

      const newRecord: TaskRecord = {
        id: Date.now().toString(),
        input: taskInput,
        status: "success",
        steps: recordSteps,
        result: mockResult,
        createdAt: Date.now(),
        totalDuration,
      };

      setTaskHistory(prev => {
        const updated = [newRecord, ...prev];
        saveTaskHistory(updated);
        return updated;
      });

      return;
    }

    const nextStep = currentSteps[currentIndex];

    // 检查是否需要等待确认
    if (needsConfirmation(nextStep, controlMode)) {
      // 设置为 waiting 状态
      executionRef.current.steps[currentIndex] = { ...nextStep, status: "waiting" };
      setSteps([...executionRef.current.steps]);
      return;
    }

    // 自动执行
    executionRef.current.steps[currentIndex] = { ...nextStep, status: "running", startTime: Date.now() };
    setSteps([...executionRef.current.steps]);

    const executedStep = await executeStep(nextStep);
    executionRef.current.steps[currentIndex] = executedStep;
    setSteps([...executionRef.current.steps]);

    // 继续下一步
    executionRef.current.currentIndex = currentIndex + 1;
    runNextStep();
  }, [controlMode, needsConfirmation, executeStep, taskInput]);

  // 开始执行任务
  const handleRunTask = useCallback(async () => {
    if (!taskInput.trim()) return;

    setStatus("running");
    setResult("");
    setErrorMessage("");
    setViewMode("new");

    // 初始化执行状态
    const newSteps = createSteps();
    setSteps(newSteps);
    executionRef.current = {
      currentIndex: 0,
      steps: newSteps,
      startTime: Date.now(),
      resolve: null,
    };

    // 开始执行
    runNextStep();
  }, [taskInput, runNextStep]);

  const handleReset = useCallback(() => {
    setTaskInput("");
    setStatus("idle");
    setSteps(createSteps());
    setResult("");
    setErrorMessage("");
    setViewMode("new");
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isDisabled) {
        handleRunTask();
      }
    }
  };

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
    setViewMode("detail");
  };

  const handleBackToNew = () => {
    setViewMode("new");
    setSelectedTaskId(null);
  };

  return (
    <div className="h-full flex gap-6">
      {/* 左侧：历史记录 */}
      <div className="w-[260px] shrink-0 flex flex-col rounded-xl border border-border bg-card/50 overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-foreground/80">历史任务</h2>
          </div>
          <span className="text-xs text-muted-foreground">{taskHistory.length}</span>
        </div>
        <div className="flex-1 overflow-auto p-3">
          <TaskHistory
            tasks={taskHistory}
            selectedId={selectedTaskId}
            onSelect={handleSelectTask}
          />
        </div>
      </div>

      {/* 右侧：主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {viewMode === "detail" && selectedTask ? (
          /* 历史任务详情 */
          <div className="h-full flex flex-col rounded-xl border border-border bg-card/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToNew}
                className="h-7 px-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                返回
              </Button>
              <h2 className="text-sm font-medium text-foreground/80">任务详情</h2>
            </div>
            <div className="flex-1 overflow-auto">
              <TaskDetail task={selectedTask} />
            </div>
          </div>
        ) : (
          /* 新任务执行 */
          <div className="h-full flex flex-col gap-5">
            {/* 页面标题 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Task Console</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  提交任务，查看执行过程，获取结果
                </p>
              </div>
              {status === "idle" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="text-muted-foreground"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  新任务
                </Button>
              )}
            </div>

            {/* Task 输入区 */}
            <div
              className={cn(
                "rounded-xl border p-4 transition-all",
                isRunning
                  ? "bg-muted/50 border-border"
                  : "bg-card/50 border-border focus-within:border-[#4ef2c2]/30"
              )}
            >
              <Textarea
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isRunning}
                placeholder="输入您的任务，例如：&#10;• 帮我写一份 AI 产品市场调研报告&#10;• 帮我生成一个 PRD 文档&#10;• 分析当前系统的性能瓶颈并给出优化建议"
                className="min-h-[80px] bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-base"
              />

              {/* 执行控制区 */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <ExecutionControl
                      mode={controlMode}
                      onChange={setControlMode}
                      disabled={isRunning}
                    />
                    <ExecutionModeDescription mode={controlMode} />
                  </div>

                  <div className="flex items-center gap-2">
                    {status === "success" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <RotateCcw className="w-4 h-4 mr-1.5" />
                        重新开始
                      </Button>
                    )}
                    <Button
                      onClick={handleRunTask}
                      disabled={isDisabled}
                      className={cn(
                        "bg-[#4ef2c2] text-[#0b0c10] hover:bg-[#4ef2c2]/90",
                        isRunning && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isRunning ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0b0c10]/30 border-t-[#0b0c10] rounded-full animate-spin mr-2" />
                          执行中
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Run Task
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 执行过程和结果 */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
              {/* Execution Timeline */}
              <div className="flex flex-col rounded-xl border border-border bg-card/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <h2 className="text-sm font-medium text-foreground/80">Execution Timeline</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">任务执行过程 · 含工具调用</p>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <ExecutionTimeline
                    steps={steps}
                    onContinue={isRunning ? handleContinue : undefined}
                  />
                </div>
              </div>

              {/* Result */}
              <div className="flex flex-col rounded-xl border border-border bg-card/50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <h2 className="text-sm font-medium text-foreground/80">Result</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">任务执行结果</p>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  {status === "error" ? (
                    <div className="flex flex-col items-center justify-center py-16 text-destructive">
                      <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                      <p className="text-sm font-medium">执行失败</p>
                      <p className="text-xs text-muted-foreground mt-1">{errorMessage}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRunTask}
                        className="mt-4"
                      >
                        重试
                      </Button>
                    </div>
                  ) : (
                    <TaskResult content={result} isLoading={isRunning} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 生成模拟结果
function generateMockResult(): string {
  return `# AI 行业趋势分析报告

## 概述

基于 Web Search 和 Database Query 的数据分析，本报告总结了 AI 行业在 2025 年的关键趋势。

---

## 一、市场环境分析

### 1.1 行业规模

根据最新市场调研数据：

- **全球 AI 市场规模**：预计 2025 年达到 $4,200 亿
- **年增长率**：37.3% CAGR
- **主要驱动力**：生成式 AI、企业自动化、智能客服

### 1.2 用户增长趋势

从数据库查询结果来看：

| 季度 | 新增用户 | 活跃用户 | 增长率 |
|------|----------|----------|--------|
| Q1 2024 | 2,340 | 8,500 | 12% |
| Q2 2024 | 2,890 | 10,200 | 20% |
| Q3 2024 | 3,450 | 12,800 | 25% |
| Q4 2024 | 3,770 | 15,600 | 22% |

---

## 二、核心技术趋势

### 2.1 多模态 AI

> 🔧 **工具洞察**：Web Search 显示，多模态模型成为主流方向

- 图像、语音、文本统一处理
- 跨模态理解能力提升
- 应用场景持续扩展

### 2.2 AI Agent

- 自主决策能力增强
- 工具调用成为标配
- 多 Agent 协作架构兴起

---

## 三、建议与展望

### 短期策略

- ✅ 接入主流 AI 能力
- ✅ 建立数据基础设施

### 中期规划

- 🎯 开发垂直场景应用
- 🎯 构建私有知识库

---

## 总结

AI 行业正处于快速发展期，技术迭代加速，应用场景不断拓展。

---

*报告生成时间: ${new Date().toLocaleString("zh-CN")}*
`;
}
