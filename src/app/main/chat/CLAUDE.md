[根目录](../../../../CLAUDE.md) > [src/app](../../) > [main](../) > **chat**

# 对话系统模块

## 模块职责

提供 AI 对话功能，包括会话管理、消息收发、Markdown 渲染等核心对话体验。

## 入口与启动

- **入口文件**: `src/app/main/chat/layout.tsx` (状态管理)
- **页面文件**: `src/app/main/chat/page.tsx` (空页面)
- **路由**: `/main/chat`

## 对外接口

### API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/proxy/conversation/list` | GET | 获取会话列表 |
| `/api/proxy/conversation/create` | POST | 创建新会话 |
| `/api/proxy/conversation/update` | PUT | 更新会话标题 |
| `/api/proxy/conversation/delete` | DELETE | 删除会话 |
| `/api/proxy/message/list` | GET | 获取消息列表 |
| `/api/proxy/message/chat` | POST | 发送消息 |

### 数据结构

```typescript
// 会话
interface Conversation {
  id: number;
  title: string;
}

// 消息
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

// 后端消息格式
interface RawMessage {
  id: number;
  senderType: number;  // 1 = user, 2 = assistant
  content: string;
}
```

## 关键依赖与配置

- `src/lib/http.ts` - HTTP 请求
- `react-markdown` - Markdown 渲染
- `remark-gfm` - GitHub Flavored Markdown 支持
- `@/components/ui/scroll-area` - 滚动区域
- `@/components/ui/dialog` - 对话框组件

## 组件架构

```
layout.tsx (状态管理)
├── ChatConversationList.tsx (左侧会话列表)
│   ├── ChatConversationItem.tsx (单个会话项)
│   └── Dialog (编辑/删除确认)
└── ChatConversationPanel.tsx (右侧对话面板)
    ├── ChatMessages.tsx (消息列表)
    │   └── ChatBubble.tsx (单条消息气泡)
    └── ChatInput.tsx (输入框)
```

## 核心功能

### 会话管理

- 创建、编辑标题、删除会话
- 自动选中第一个会话
- 会话切换时加载对应消息

### 消息交互

- 发送消息后添加用户消息到列表
- 等待 AI 回复期间显示 "thinking" 动画
- 回复成功后追加助手消息
- 错误时显示错误消息

### Markdown 渲染

助手消息支持：
- GitHub Flavored Markdown
- 代码高亮 (prose 样式)
- 链接、列表等格式

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `layout.tsx` | 状态管理、整体布局 |
| `page.tsx` | 空页面 (逻辑在 layout 中) |
| `components/ChatConversationList.tsx` | 会话列表 |
| `components/ChatConversationItem.tsx` | 会话项 |
| `components/ChatConversationPanel.tsx` | 对话面板 |
| `components/ChatMessages.tsx` | 消息列表容器 |
| `components/ChatBubble.tsx` | 消息气泡 |
| `components/ChatInput.tsx` | 输入框 |

## 变更记录 (Changelog)

### 2026-03-21 - 更新

- 侧边栏导航新增 Task 入口

### 2026-03-19 - 初始化

- 创建模块文档
