[根目录](../../CLAUDE.md) > [src](../) > **hooks**

# 自定义 Hooks 模块

## 模块职责

提供可复用的 React Hooks，封装复杂的业务逻辑和状态操作。

## 入口与启动

这是一个纯 Hook 模块，无入口文件，通过具名导入使用。

## 对外接口

### useAuth - 认证 Hook

```typescript
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { token, isAuthenticated, login, logout } = useAuth();

  // 登录
  const handleLogin = async () => {
    await login(email, password);
  };

  // 登出
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? "已登录" : "未登录"}
    </div>
  );
}
```

## Hook 定义

### useAuth

```typescript
interface UseAuthReturn {
  token: string | null;           // 当前 Token
  isAuthenticated: boolean;       // 是否已认证
  login: (email: string, password: string) => Promise<void>;  // 登录方法
  logout: () => void;             // 登出方法
}
```

**功能说明**:

- 从 Zustand store 读取认证状态
- 封装登录逻辑（调用 authService、存储 token、跳转主页）
- 封装登出逻辑（清除 token、跳转登录页）
- 返回便捷的认证状态和方法

## 关键依赖与配置

- `next/navigation` - 路由导航
- `@/store/auth` - 认证状态 Store
- `@/services/auth.service` - 认证服务

## 使用示例

### 在登录页使用

```tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // 登录成功，自动跳转到 /main
    } catch (error) {
      // 处理错误
      console.error("登录失败:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
    </form>
  );
}
```

### 在需要认证状态的组件中使用

```tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export function UserProfile() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>请先登录</p>;
  }

  return (
    <button onClick={logout}>
      登出
    </button>
  );
}
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `index.ts` | 统一导出 |
| `useAuth.ts` | 认证 Hook |

## 扩展指南

添加新的 Hook：

1. 在 `src/hooks/` 下创建 `useXxx.ts`
2. 实现 Hook 逻辑
3. 在 `index.ts` 中导出

```typescript
// src/hooks/useXxx.ts
'use client';

import { useState, useEffect } from 'react';

export function useXxx() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    // 副作用逻辑
  }, []);

  return { value, setValue };
}

// src/hooks/index.ts
export { useXxx } from './useXxx';
```

## 变更记录 (Changelog)

### 2026-03-22 - 初始化

- 创建 Hooks 模块
- 实现 `useAuth` 认证 Hook
