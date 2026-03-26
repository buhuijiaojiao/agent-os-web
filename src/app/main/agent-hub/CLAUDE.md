[根目录](../../../../CLAUDE.md) > [src/app](../../) > [main](../) > **agent-hub**

# 智能体中心模块

## 模块职责

管理和配置 Agent OS 中的智能体，包括 Agent 的创建、编辑、删除、启用/禁用切换、Prompt 配置、工具绑定等功能。已对接后端 API，实现完整的 CRUD 操作。

## 入口与启动

- **入口文件**: `src/app/main/agent-hub/page.tsx`
- **路由**: `/main/agent-hub`

## 对外接口

### Agent 数据结构

```typescript
// Agent 列表项（摘要）
interface AgentListItem {
  id: string;
  name: string;
  description: string;
  modelName: string;
  enabled: boolean;
  updatedAt: number;
}

// Agent 详情
interface AgentDetail {
  id: string;
  name: string;
  description: string;
  model: Model;
  temperature: number;
  prompt: string;
  tools: AgentTool[];
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

// Agent 工具绑定
interface AgentTool {
  id: string;
  name: string;
  enabled: boolean;
}

// 可用模型
interface Model {
  id: string;
  name: string;
  provider: string;
}

// 创建/编辑请求
interface AgentRequest {
  name: string;
  description: string;
  modelId: string;
  temperature: number;
  prompt: string;
  tools: AgentToolBinding[];
}
```

### API 服务

```typescript
import { agentService } from "@/services/agent.service";

// 获取 Agent 列表
const agents = await agentService.getList();

// 获取 Agent 详情
const detail = await agentService.getById(id);

// 创建 Agent
await agentService.create(data);

// 更新 Agent
await agentService.update(id, data);

// 删除 Agent
await agentService.delete(id);

// 切换启用状态
await agentService.toggleEnabled(id, enabled);

// 获取可用模型列表
const models = await agentService.getModels();
```

## 关键依赖与配置

- `@/components/ui/card` - 卡片组件
- `@/components/ui/badge` - 标签组件
- `@/components/ui/sheet` - 侧边抽屉
- `@/components/ui/dialog` - 对话框
- `@/components/ui/input` - 输入框
- `@/components/ui/textarea` - 文本域
- `@/components/ui/select` - 选择器
- `@/components/ui/slider` - 滑块
- `@/components/ui/checkbox` - 复选框
- `@/components/ui/switch` - 开关
- `@/components/ui/dropdown-menu` - 下拉菜单
- `@/services/agent.service` - Agent API 服务
- `lucide-react` - 图标库

## 组件架构

```
page.tsx (主页面)
├── AgentCard.tsx (Agent 卡片 - 展示、编辑入口、删除入口、状态切换)
├── AgentFormSheet.tsx (创建/编辑抽屉容器)
│   └── AgentFormContent.tsx (表单内容)
│       ├── 基本信息区（名称、描述）
│       ├── 模型配置区（模型选择、Temperature）
│       ├── System Prompt 区
│       └── 工具绑定区
└── DeleteConfirmDialog.tsx (删除确认对话框)
```

## 核心功能

### Agent 列表展示

- 网格布局展示所有 Agent
- 支持搜索过滤
- 显示模型名称、启用状态、更新时间
- 卡片悬停显示操作菜单

### Agent 创建/编辑

通过侧边抽屉 (Sheet) 提供表单：

1. **基本信息**: 名称（必填）、描述
2. **模型配置**: 模型选择（必填）、Temperature 滑块
3. **System Prompt**: 定义 Agent 行为
4. **工具绑定**: 启用/禁用绑定的工具

### Agent 状态管理

- 快速切换启用/禁用状态
- 删除确认对话框防止误删

## API 端点

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/proxy/agents` | 获取 Agent 列表 |
| GET | `/api/proxy/agents/:id` | 获取 Agent 详情 |
| POST | `/api/proxy/agents` | 创建 Agent |
| PUT | `/api/proxy/agents/:id` | 更新 Agent |
| DELETE | `/api/proxy/agents/:id` | 删除 Agent |
| PUT | `/api/proxy/agents/:id/enabled` | 切换启用状态 |
| GET | `/api/proxy/models` | 获取可用模型列表 |

## 当前状态

- 已对接后端 API
- 保留 `mocks.ts` 作为开发测试数据
- 支持完整的 CRUD 操作

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `page.tsx` | 主页面、状态管理、CRUD 操作 |
| `components/AgentCard.tsx` | Agent 卡片组件 |
| `components/AgentFormSheet.tsx` | 创建/编辑抽屉容器 |
| `components/AgentFormContent.tsx` | 表单内容组件 |
| `components/DeleteConfirmDialog.tsx` | 删除确认对话框 |
| `mocks.ts` | Mock 数据（开发用） |

## 变更记录 (Changelog)

### 2026-03-25 - 重构对接后端 API

- 完全重构模块，对接后端 API
- 新增 `agent.service.ts` 服务
- 重构类型定义，分离列表项和详情类型
- 新增完整的 CRUD 功能
- 新增模型选择和 Temperature 配置
- 新增删除确认对话框
- 保留 Mock 数据作为开发参考

### 2026-03-21 - 更新

- 侧边栏导航新增 Task 入口

### 2026-03-19 - 初始化

- 创建模块文档
