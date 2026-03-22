[根目录](../../CLAUDE.md) > [src](../) > **types**

# 类型定义模块

## 模块职责

提供全局 TypeScript 类型定义，确保类型安全和代码一致性。

## 入口与启动

这是一个纯类型模块，无入口文件，通过具名导入使用。

## 对外接口

### 认证类型 (auth.ts)

```typescript
import type { LoginRequest, User } from "@/types/auth";

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
}
```

### 对话类型 (conversation.ts)

```typescript
import type { Conversation, Message, RawMessage } from "@/types/conversation";

interface Conversation {
  id: number;
  title: string;
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

interface RawMessage {
  id: number;
  senderType: number;  // 1 = user, 2 = assistant
  content: string;
}

// 转换函数
function transformRawMessage(raw: RawMessage): Message;
```

### 任务类型 (task.ts)

```typescript
import type {
  ExecutionStep,
  TaskRecord,
  ExecutionStepRecord,
  ExecutionControlMode,
  StepStatus,
  StepType
} from "@/types/task";

type StepStatus = 'pending' | 'running' | 'waiting' | 'done';
type StepType = 'thinking' | 'tool';
type TaskRecordStatus = 'success' | 'error';
type ExecutionControlMode = 'autonomous' | 'guided' | 'manual';

interface ExecutionStep {
  id: string;
  title: string;
  type: StepType;
  status: StepStatus;
  toolName?: string;
  toolInput?: string;
  description?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
}

interface TaskRecord {
  id: string;
  input: string;
  status: TaskRecordStatus;
  steps: ExecutionStepRecord[];
  result: string;
  createdAt: number;
  totalDuration?: number;
}

interface ExecutionStepRecord {
  id: string;
  title: string;
  type: StepType;
  status: 'done';
  toolName?: string;
  toolInput?: string;
  description?: string;
  duration?: number;
}
```

### 智能体类型 (agent.ts)

```typescript
import type { Agent, AgentDetails, McpTool } from "@/types/agent";

interface Agent {
  id: string;
  name: string;
  role: string;          // "Persona" | "MCP/Tool"
  description: string;
  tools: number;         // 工具数量
  memoryId: string | null;
}

interface AgentDetails {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;  // AI 人格定义
  memoryId: string | null;
  toolIds: string[];     // 绑定的 MCP 工具 ID
}

interface McpTool {
  id: string;
  name: string;
}
```

## 关键依赖与配置

- 无外部依赖，纯 TypeScript 类型定义

## 类型分类

| 文件 | 说明 | 主要类型 |
|------|------|----------|
| `auth.ts` | 认证相关 | `LoginRequest`, `User` |
| `conversation.ts` | 对话相关 | `Conversation`, `Message`, `RawMessage` |
| `task.ts` | 任务相关 | `ExecutionStep`, `TaskRecord`, `ExecutionControlMode` |
| `agent.ts` | 智能体相关 | `Agent`, `AgentDetails`, `McpTool` |

## 使用示例

```typescript
import type { Conversation, Message } from "@/types/conversation";
import type { ExecutionStep, ExecutionControlMode } from "@/types/task";
import type { Agent, AgentDetails } from "@/types/agent";

// 在函数签名中使用
function processMessage(message: Message): string {
  return message.content;
}

// 在组件 Props 中使用
interface TaskProps {
  steps: ExecutionStep[];
  mode: ExecutionControlMode;
}
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `index.ts` | 统一导出 |
| `auth.ts` | 认证类型定义 |
| `conversation.ts` | 对话类型定义 |
| `task.ts` | 任务类型定义 |
| `agent.ts` | 智能体类型定义 |

## 扩展指南

添加新的类型文件：

1. 在 `src/types/` 下创建 `xxx.ts`
2. 定义接口和类型
3. 在 `index.ts` 中导出

```typescript
// src/types/xxx.ts
export interface SomeType {
  id: string;
  name: string;
}

export type SomeStatus = 'active' | 'inactive';

// src/types/index.ts
export * from './xxx';
```

## 变更记录 (Changelog)

### 2026-03-22 - 初始化

- 创建类型定义模块
- 定义 `auth.ts` 认证类型
- 定义 `conversation.ts` 对话类型
- 定义 `task.ts` 任务类型
- 定义 `agent.ts` 智能体类型
