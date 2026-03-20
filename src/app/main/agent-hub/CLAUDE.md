[根目录](../../../../CLAUDE.md) > [src/app](../../) > [main](../) > **agent-hub**

# 智能体中心模块

## 模块职责

管理和配置 Agent OS 中的智能体，包括 Agent 的创建、编辑、Prompt 配置、MCP 工具绑定等功能。

## 入口与启动

- **入口文件**: `src/app/main/agent-hub/page.tsx`
- **路由**: `/main/agent-hub`

## 对外接口

### Agent 数据结构

```typescript
interface Agent {
  id: string;
  name: string;
  role: string;          // "Persona" | "MCP/Tool"
  description: string;
  tools: number;         // 工具数量
  memoryId: string | null;  // 记忆 ID
}

interface AgentDetails {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;  // AI 人格定义
  memoryId: string | null;
  toolIds: string[];     // 绑定的 MCP 工具 ID
}
```

## 关键依赖与配置

- `@/components/ui/card` - 卡片组件
- `@/components/ui/badge` - 标签组件
- `@/components/ui/sheet` - 侧边抽屉
- `@/components/ui/tabs` - 标签页
- `@/components/ui/scroll-area` - 滚动区域
- `lucide-react` - 图标库

## 组件架构

```
page.tsx (主页面)
├── AgentCard.tsx (Agent 卡片)
└── AgentDetailsSheet.tsx (详情配置抽屉)
    ├── 基础信息 Tab
    ├── AI 人格 (Prompt) Tab
    └── 工具集 (MCP) Tab
```

## 核心功能

### Agent 列表展示

- 网格布局展示所有 Agent
- 按角色类型显示不同颜色标签
- 显示工具数量和记忆 ID

### Agent 配置面板

通过侧边抽屉 (Sheet) 提供三个配置标签页：

1. **基础信息**: 名称、角色、记忆 ID
2. **AI 人格 (Prompt)**: System Prompt 编辑
3. **工具集 (MCP)**: MCP 服务/工具绑定

### MCP 工具示例

```typescript
const availableTools = [
  { id: "mcp-search-001", name: "Google Search (Web Tool)" },
  { id: "mcp-calendar-002", name: "Calendar Manager (MCP)" },
  { id: "mcp-file-003", name: "Drive Indexer (MCP)" },
];
```

## 当前状态

- 使用 Mock 数据，未连接后端 API
- `AgentDetailsSheet` 中的保存功能为模拟实现

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `page.tsx` | 主页面、Agent 列表 |
| `components/AgentCard.tsx` | Agent 卡片组件 |
| `components/AgentDetailsSheet.tsx` | Agent 详情配置抽屉 |

## 变更记录 (Changelog)

### 2026-03-21 - 更新

- 侧边栏导航新增 Task 入口

### 2026-03-19 - 初始化

- 创建模块文档
