[根目录](../../../CLAUDE.md) > [src](../) > **lib**

# 工具库模块

## 模块职责

提供项目的核心工具函数，包括 HTTP 请求封装和通用工具函数。

## 入口与启动

这是一个纯工具模块，无入口文件，通过具名导入使用。

## 对外接口

### HTTP 请求 (`http.ts`)

```typescript
// 请求方法
export const httpGet = <T>(url: string) => request<T>(url, { method: "GET" });
export const httpPost = <T>(url: string, body?: unknown) => request<T>(url, { method: "POST", body: JSON.stringify(body || {}) });
export const httpPut = <T>(url: string, body?: unknown) => request<T>(url, { method: "PUT", body: JSON.stringify(body || {}) });
export const httpPatch = <T>(url: string, body?: unknown) => request<T>(url, { method: "PATCH", body: JSON.stringify(body || {}) });
export const httpDelete = <T>(url: string) => request<T>(url, { method: "DELETE" });
```

### 工具函数 (`utils.ts`)

```typescript
export function cn(...inputs: ClassValue[]): string;
```

## 关键依赖与配置

### 后端响应结构

```typescript
interface Result<T> {
  code: string;    // "2000" = 成功
  message: string;
  data: T;
}
```

### 错误码约定

| Code | 含义 | 处理方式 |
|------|------|----------|
| `2000` | 成功 | 返回 data |
| `4001` | Token 失效 | 清除 Token，跳转登录页 |
| 其他 | 业务错误 | 抛出 Error |

## 核心功能

### HTTP 请求封装

1. 自动添加 `Content-Type: application/json`
2. 自动从 **Zustand store** (`useAuthStore`) 读取并添加 `Authorization` 头
3. 统一处理后端响应格式
4. Token 失效自动跳转登录页
5. 统一错误处理

**重要变更**: Token 不再从 `localStorage.authToken` 读取，而是从 Zustand store 获取：

```typescript
import { useAuthStore } from '@/store/auth';

// 获取 token
const token = useAuthStore.getState().token;

// 清除 token（失效时）
useAuthStore.getState().clearToken();
```

### cn 函数

Tailwind CSS 类名合并工具，使用 `clsx` + `tailwind-merge`：

```typescript
cn("px-4 py-2", isActive && "bg-primary", className)
```

## 使用示例

```typescript
import { httpGet, httpPost } from "@/lib/http";
import { cn } from "@/lib/utils";

// GET 请求
const conversations = await httpGet<Conversation[]>("/api/proxy/conversation/list");

// POST 请求
const token = await httpPost<string>("/api/proxy/user/doLogin", {
  email: "user@example.com",
  password: "password",
});

// cn 函数
<div className={cn("base-class", condition && "conditional-class")} />
```

**推荐**: 在实际开发中，建议使用 `src/services/` 中的服务封装，而非直接调用 HTTP 方法。

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `http.ts` | HTTP 请求封装 |
| `utils.ts` | 工具函数 (cn) |

## 变更记录 (Changelog)

### 2026-03-22 - Token 来源变更

- Token 不再从 `localStorage.authToken` 读取
- 改为从 Zustand store (`useAuthStore`) 获取
- Token 失效时调用 `useAuthStore.getState().clearToken()` 清除

### 2026-03-21 - 更新

- 无功能变更

### 2026-03-19 - 初始化

- 创建模块文档
