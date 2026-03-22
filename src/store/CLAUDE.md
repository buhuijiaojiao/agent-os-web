[根目录](../../CLAUDE.md) > [src](../) > **store**

# 状态管理模块 (Zustand)

## 模块职责

提供全局状态管理，使用 Zustand 实现响应式状态存储，支持持久化到 localStorage。

## 入口与启动

这是一个纯状态管理模块，无入口文件，通过具名导入使用。

## 对外接口

### useAuthStore - 认证状态

```typescript
import { useAuthStore } from "@/store/auth";

// 在组件中使用
const token = useAuthStore((state) => state.token);
const { setToken, clearToken, isAuthenticated } = useAuthStore();

// 在组件外使用（如 http.ts）
const token = useAuthStore.getState().token;
useAuthStore.getState().clearToken();
```

### useSidebarStore - 侧边栏状态

```typescript
import { useSidebarStore } from "@/store/sidebar";

// 在组件中使用
const isCollapsed = useSidebarStore((state) => state.isCollapsed);
const { toggle, setCollapsed } = useSidebarStore();
```

## 关键依赖与配置

- `zustand` - 状态管理库
- `zustand/middleware/persist` - 持久化中间件

### 持久化存储

| Store | localStorage Key | 持久化字段 |
|-------|------------------|------------|
| auth | `auth-storage` | `token` |
| sidebar | `sidebar-storage` | `isCollapsed` |

## Store 定义

### AuthStore

```typescript
interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
}
```

### SidebarStore

```typescript
interface SidebarState {
  isCollapsed: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
}
```

## 使用示例

### 在组件中使用

```tsx
"use client";

import { useAuthStore } from "@/store/auth";
import { useSidebarStore } from "@/store/sidebar";

export function MyComponent() {
  // 选择器模式 - 推荐用于性能优化
  const token = useAuthStore((state) => state.token);

  // 解构模式 - 适用于需要多个方法
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <div>
      {token ? "已登录" : "未登录"}
      <button onClick={toggle}>
        {isCollapsed ? "展开" : "折叠"}
      </button>
    </div>
  );
}
```

### 在组件外使用

```typescript
// src/lib/http.ts
import { useAuthStore } from '@/store/auth';

// 获取 token
const token = useAuthStore.getState().token;

// 清除 token
useAuthStore.getState().clearToken();
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `index.ts` | 统一导出 |
| `auth.ts` | 认证状态 Store |
| `sidebar.ts` | 侧边栏状态 Store |

## 变更记录 (Changelog)

### 2026-03-22 - 初始化

- 引入 Zustand 状态管理
- 创建 `auth.ts` 认证状态 Store
- 创建 `sidebar.ts` 侧边栏状态 Store
- 支持持久化存储到 localStorage
