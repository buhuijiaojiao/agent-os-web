[根目录](../../../../CLAUDE.md) > [src/app](../../) > [main](../) > **task**

# 任务执行控制台模块

## 模块职责

提供任务执行的可视化控制台，包括任务输入、执行时间线展示、结果渲染、历史记录管理以及执行模式控制。

## 入口与启动

- **入口文件**: `src/app/main/task/page.tsx`
- **路由**: `/main/task`

## 对外接口

### 执行步骤数据结构

```typescript
type StepStatus = "pending" | "running" | "waiting" | "done";
type StepType = "thinking" | "tool";

interface ExecutionStep {
  id: string;
  title: string;
  type: StepType;
  status: StepStatus;
  toolName?: string;      // 工具名称（type=tool 时）
  toolInput?: string;     // 工具输入参数
  description?: string;   // 执行结果描述
  startTime?: number;
  endTime?: number;
  duration?: number;
}
```

### 任务记录数据结构

```typescript
type TaskRecordStatus = "success" | "error";

interface TaskRecord {
  id: string;
  input: string;                  // 用户输入的任务
  status: TaskRecordStatus;
  steps: ExecutionStepRecord[];   // 执行步骤
  result: string;                 // 最终结果（Markdown）
  createdAt: number;              // 创建时间戳
  totalDuration?: number;         // 总耗时（ms）
}

interface ExecutionStepRecord {
  id: string;
  title: string;
  type: StepType;
  status: "done";
  toolName?: string;
  toolInput?: string;
  description?: string;
  duration?: number;
}
```

### 执行控制模式

```typescript
type ExecutionControlMode = "autonomous" | "guided" | "manual";

// autonomous: 全自动执行，所有步骤无需确认
// guided: 引导式执行，工具调用需要确认，其他自动
// manual: 手动执行，每一步都需要确认
```

## 关键依赖与配置

- `@/components/ui/button` - 按钮组件
- `@/components/ui/textarea` - 文本输入
- `react-markdown` - Markdown 渲染
- `remark-gfm` - GitHub Flavored Markdown 支持
- `lucide-react` - 图标库

### LocalStorage 键

| 键名 | 说明 |
|------|------|
| `task_history` | 任务历史记录（最多保存 20 条） |

## 组件架构

```
page.tsx (主页面)
├── TaskHistory.tsx (左侧历史记录列表)
│   └── TaskHistoryItem (单个历史任务项)
├── TaskDetail.tsx (历史任务详情视图)
│   └── StepRecordItem (执行步骤项)
├── ExecutionTimeline.tsx (执行时间线)
│   └── StepItem (步骤项)
│       ├── ThinkingStepContent (思考步骤)
│       └── ToolStepContent (工具调用步骤)
├── TaskResult.tsx (结果渲染)
└── ExecutionControl.tsx (执行模式控制)
```

## 核心功能

### 任务执行流程

1. 用户输入任务描述
2. 选择执行模式（Autonomous / Guided / Manual）
3. 点击 "Run Task" 开始执行
4. 执行时间线实时展示每个步骤的状态
5. Guided/Manual 模式下需要用户确认
6. 执行完成后展示 Markdown 格式结果
7. 自动保存到历史记录

### 执行状态流转

```
pending -> running -> done
         ↘ waiting -> running -> done
```

- `pending`: 等待执行
- `running`: 正在执行
- `waiting`: 等待用户确认（Guided/Manual 模式）
- `done`: 执行完成

### 历史记录管理

- 任务执行成功后自动保存
- 最多保留 20 条记录
- 点击历史任务可查看详情
- 显示执行状态、工具调用数量、总耗时

### 执行模式说明

| 模式 | 图标 | 行为 |
|------|------|------|
| Autonomous | Zap | 所有步骤自动执行 |
| Guided | Compass | 工具调用需确认，思考自动执行 |
| Manual | Hand | 每一步都需手动确认 |

## 当前状态

- 使用 Mock 数据模拟执行过程
- 步骤模板和工具结果为硬编码
- 未连接后端 API

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `page.tsx` | 主页面，状态管理 |
| `components/ExecutionTimeline.tsx` | 执行时间线组件 |
| `components/TaskResult.tsx` | 结果展示组件 |
| `components/TaskHistory.tsx` | 历史记录列表 |
| `components/TaskDetail.tsx` | 历史任务详情 |
| `components/ExecutionControl.tsx` | 执行模式控制 |

## 待完成功能

1. 连接后端 API 获取真实执行结果
2. 支持流式输出（Streaming）
3. 支持任务中断/取消
4. 支持步骤重试

## 变更记录 (Changelog)

### 2026-03-21 - 初始化

- 创建任务执行控制台模块
- 实现执行时间线、结果渲染、历史记录
- 支持三种执行模式
