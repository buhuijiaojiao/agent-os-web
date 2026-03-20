[根目录](../../../../../CLAUDE.md) > [src/app](../../../../) > [main](../../../) > **components/layout**

# 布局组件模块

## 模块职责

提供主应用区域的布局组件，包括可折叠侧边栏、顶部栏和侧边栏状态管理。

## 入口与启动

这是一个纯组件模块，无入口文件，通过具名导入使用。

主要使用位置：`src/app/main/layout.tsx`

## 对外接口

### AppSidebar

可折叠侧边栏组件，包含导航菜单和折叠控制。

```tsx
import { AppSidebar } from "./AppSidebar";

<AppSidebar />
```

### AppTopBar

顶部栏组件，显示当前工作区信息和系统状态。

```tsx
import { AppTopBar } from "./AppTopBar";

<AppTopBar />
```

### SidebarProvider / useSidebar

侧边栏状态管理 Context。

```tsx
import { SidebarProvider, useSidebar } from "./SidebarContext";

// 在布局层提供 Context
<SidebarProvider>
  <AppSidebar />
  <Content />
</SidebarProvider>

// 在子组件中使用
const { isCollapsed, toggle, setCollapsed } = useSidebar();
```

## 关键依赖与配置

- `next/link` - 路由链接
- `next/navigation` - 路由钩子
- `lucide-react` - 图标库
- `@/components/ui/tooltip` - 工具提示组件
- `@/components/theme-toggle` - 主题切换组件

### LocalStorage 键

| 键名 | 说明 |
|------|------|
| `sidebar_collapsed` | 侧边栏折叠状态 |

## 组件架构

```
SidebarContext.tsx (状态管理)
├── SidebarProvider (Context Provider)
└── useSidebar (Hook)

AppSidebar.tsx
├── Logo 区域
├── 导航菜单
│   └── 导航项 (带 Tooltip 折叠支持)
└── 折叠按钮

AppTopBar.tsx
├── 左侧：工作区标识
└── 右侧：主题切换、系统状态、环境标识
```

## 核心功能

### 侧边栏折叠

- 点击底部按钮切换折叠/展开
- 折叠后宽度从 260px 缩小到 68px
- 折叠状态下导航项显示 Tooltip 提示
- 状态持久化到 localStorage

### 导航菜单

| 标签 | 路径 | 图标 |
|------|------|------|
| Home | /main | Home |
| Chat | /main/chat | MessageSquare |
| Task | /main/task | Terminal |
| Agent Hub | /main/agent-hub | Bot |
| Blog | /main/blog | Book |
| Log | /main/log | Logs |
| Knowledge | /main/knowledge-base | LibraryBig |

### 顶部栏

- 左侧显示当前工作区名称
- 右侧包含：
  - 主题切换按钮
  - AI 在线状态指示器
  - 环境标识（beta）

## 使用示例

```tsx
// src/app/main/layout.tsx
"use client";

import { AppSidebar } from "./components/layout/AppSidebar";
import { AppTopBar } from "./components/layout/AppTopBar";
import { SidebarProvider, useSidebar } from "./components/layout/SidebarContext";

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex h-full">
      <div className={isCollapsed ? "w-[68px]" : "w-[260px]"}>
        <AppSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <AppTopBar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  );
}
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `AppSidebar.tsx` | 可折叠侧边栏组件 |
| `AppTopBar.tsx` | 顶部栏组件 |
| `SidebarContext.tsx` | 侧边栏状态 Context |

## 变更记录 (Changelog)

### 2026-03-21 - 迁移与增强

- 从 `src/components/layout/` 迁移至 `src/app/main/components/layout/`
- 新增 `SidebarContext.tsx` 支持折叠状态管理
- 新增折叠动画和 Tooltip 支持
- 集成主题切换组件
