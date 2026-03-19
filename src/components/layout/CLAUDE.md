[根目录](../../../CLAUDE.md) > [src](../) > **components/layout**

# 布局组件模块

## 模块职责

提供主应用的布局结构，包括侧边栏导航和顶部状态栏。

## 入口与启动

- **侧边栏**: `src/components/layout/AppSidebar.tsx`
- **顶部栏**: `src/components/layout/AppTopBar.tsx`

## 对外接口

### 导出组件

| 组件 | 说明 |
|------|------|
| `AppSidebar` | 应用侧边栏 |
| `AppTopBar` | 应用顶部栏 |

## 关键依赖与配置

- `next/link` - 路由链接
- `next/navigation` - 路由钩子 (usePathname)
- `lucide-react` - 图标库
- `@/lib/utils` - cn 函数

## 组件详情

### AppSidebar

侧边栏导航组件，包含：

- Logo 区域
- 导航菜单 (Home, Chat, Agent Hub, Blog, Log, Knowledge)
- 版本信息

导航项配置：

```typescript
const nav = [
  { label: "Home", href: "/main", icon: Home },
  { label: "Chat", href: "/main/chat", icon: MessageSquare },
  { label: "Agent Hub", href: "/main/agent-hub", icon: Bot },
  { label: "Blog", href: "/main/blog", icon: Book },
  { label: "Log", href: "/main/log", icon: Logs },
  { label: "Knowledge", href: "/main/knowledge-base", icon: LibraryBig },
];
```

### AppTopBar

顶部状态栏组件，包含：

- 左侧：工作区名称、当前会话
- 右侧：系统状态 (AI Online)、环境标识 (beta)

## 使用位置

在 `src/app/main/layout.tsx` 中引入：

```tsx
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `AppSidebar.tsx` | 侧边栏组件 |
| `AppTopBar.tsx` | 顶部栏组件 |

## 变更记录 (Changelog)

### 2026-03-19 - 初始化

- 创建模块文档
