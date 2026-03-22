[根目录](../../../../CLAUDE.md) > [src/app](../../) > [auth](../) > **login**

# 登录认证模块

## 模块职责

处理用户身份认证，包括登录表单、Token 管理和登录状态维护。

## 入口与启动

- **入口文件**: `src/app/auth/login/page.tsx`
- **布局文件**: `src/app/auth/login/layout.tsx`
- **路由**: `/auth/login`

## 对外接口

### API 调用

通过 `useAuth` Hook 调用认证服务：

| 方法 | API 端点 | 说明 |
|------|----------|------|
| `login(email, password)` | `/api/proxy/auth/login` | 用户登录 |

### 请求参数

```typescript
// 登录请求
interface LoginRequest {
  email: string;
  password: string;
}

// 返回值
string // Token
```

## 关键依赖与配置

- `src/hooks/useAuth.ts` - 认证 Hook
- `src/services/auth.service.ts` - 认证服务
- `src/store/auth.ts` - 认证状态 Store (Zustand)

## 核心逻辑

### 登录流程

1. 用户输入邮箱和密码
2. 调用 `useAuth().login(email, password)`
3. Hook 内部调用 `authService.login()`
4. 成功后将 Token 存入 **Zustand store** (`auth-storage`)
5. 使用 `router.replace("/main")` 跳转主页

### 架构层次

```
LoginPage
  └── useAuth Hook
        ├── useAuthStore (状态管理)
        └── authService.login() (API 调用)
              └── httpPost() (HTTP 请求)
```

### 路由保护

根页面 `src/app/page.tsx` 会检测 Token（从 Zustand store）：
- 有 Token -> 跳转 `/main`
- 无 Token -> 跳转 `/auth/login`

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `page.tsx` | 登录页面主组件 |
| `layout.tsx` | 登录模块布局 |

## 变更记录 (Changelog)

### 2026-03-22 - 架构优化

- 使用 `useAuth` Hook 替代直接操作 localStorage
- 使用 Zustand store 管理认证状态
- 集成服务层 (`authService`)

### 2026-03-21 - 更新

- 主页新增 Task 功能入口

### 2026-03-19 - 初始化

- 创建模块文档
