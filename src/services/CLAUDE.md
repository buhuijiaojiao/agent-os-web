[根目录](../../CLAUDE.md) > [src](../) > **services**

# 服务层模块

## 模块职责

封装所有后端 API 调用，提供类型安全的接口方法，与 `src/lib/http.ts` 配合使用。

## 入口与启动

这是一个纯服务模块，无入口文件，通过具名导入使用。

## 对外接口

### authService - 认证服务

```typescript
import { authService } from "@/services/auth.service";

// 登录
const token = await authService.login(email, password);
```

### chatService - 聊天服务

```typescript
import { chatService } from "@/services/chat.service";

// 获取会话列表
const conversations = await chatService.getList();

// 创建新会话
const id = await chatService.create("New thread");

// 更新会话标题
await chatService.updateTitle(id, "Updated title");

// 删除会话
await chatService.delete(id);

// 获取消息列表
const messages = await chatService.getMessages(conversationId);

// 发送消息
const reply = await chatService.sendMessage(conversationId, "Hello");
```

### agentService - 智能体服务

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

- `src/lib/http.ts` - HTTP 请求封装
- `src/types/` - 类型定义

## 服务定义

### authService

| 方法 | 参数 | 返回值 | API 端点 |
|------|------|--------|----------|
| `login` | `email: string, password: string` | `Promise<string>` | `/api/proxy/auth/login` |

### chatService

| 方法 | 参数 | 返回值 | API 端点 |
|------|------|--------|----------|
| `getList` | - | `Promise<Conversation[]>` | `/api/proxy/chat/conversations` |
| `create` | `title?: string` | `Promise<number>` | `/api/proxy/chat/conversations` |
| `updateTitle` | `id: number, title: string` | `Promise<void>` | `/api/proxy/chat/conversations/{id}` |
| `delete` | `id: number` | `Promise<void>` | `/api/proxy/chat/conversations/{id}` |
| `getMessages` | `conversationId: number` | `Promise<RawMessage[]>` | `/api/proxy/chat/conversations/{id}/messages` |
| `sendMessage` | `conversationId: number, content: string` | `Promise<string>` | `/api/proxy/chat/conversations/{id}/messages` |

### agentService

| 方法 | 参数 | 返回值 | API 端点 |
|------|------|--------|----------|
| `getList` | - | `Promise<AgentListItem[]>` | `/api/proxy/agents` |
| `getById` | `id: string` | `Promise<AgentDetail>` | `/api/proxy/agents/{id}` |
| `create` | `data: AgentRequest` | `Promise<void>` | `/api/proxy/agents` |
| `update` | `id: string, data: AgentRequest` | `Promise<void>` | `/api/proxy/agents/{id}` |
| `delete` | `id: string` | `Promise<void>` | `/api/proxy/agents/{id}` |
| `toggleEnabled` | `id: string, enabled: boolean` | `Promise<void>` | `/api/proxy/agents/{id}/enabled` |
| `getModels` | - | `Promise<Model[]>` | `/api/proxy/models` |

## 使用示例

```typescript
// 在组件或 Hook 中使用
import { chatService } from "@/services/chat.service";
import { agentService } from "@/services/agent.service";
import type { Conversation, RawMessage } from "@/types/conversation";
import type { AgentListItem, AgentDetail, AgentRequest } from "@/types/agent";

async function loadConversations() {
  try {
    const conversations = await chatService.getList();
    return conversations;
  } catch (error) {
    console.error("加载会话失败:", error);
    return [];
  }
}

async function createAgent(data: AgentRequest) {
  try {
    await agentService.create(data);
    console.log("创建成功");
  } catch (error) {
    console.error("创建 Agent 失败:", error);
  }
}
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `index.ts` | 统一导出（仅导出 authService, chatService） |
| `auth.service.ts` | 认证服务 |
| `chat.service.ts` | 聊天服务 |
| `agent.service.ts` | 智能体服务 |

**注意**: `agentService` 需要手动从 `@/services/agent.service` 导入，未在 `index.ts` 中导出。

## 扩展指南

添加新的服务文件：

1. 在 `src/services/` 下创建 `xxx.service.ts`
2. 使用 `httpGet`/`httpPost`/`httpPut`/`httpDelete` 进行请求
3. 在 `index.ts` 中导出（可选）
4. 在 `src/types/` 中定义相关类型

```typescript
// src/services/xxx.service.ts
import { httpGet, httpPost } from '@/lib/http';
import type { SomeType } from '@/types/xxx';

export const xxxService = {
  getList: () => httpGet<SomeType[]>('/api/proxy/xxx'),
  create: (data: CreateDto) => httpPost<SomeType>('/api/proxy/xxx', data),
};
```

## 变更记录 (Changelog)

### 2026-03-25 - 新增 agentService

- 新增 `agent.service.ts` 智能体服务
- 实现 Agent CRUD API 封装
- 实现模型列表获取
- 实现启用状态切换

### 2026-03-22 - 初始化

- 创建服务层模块
- 实现 `authService` 认证服务
- 实现 `chatService` 聊天服务
