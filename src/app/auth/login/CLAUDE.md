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

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/proxy/user/doLogin` | POST | 用户登录 |

### 请求参数

```typescript
// 登录请求
{
  email: string;
  password: string;
}

// 返回值
string // Token
```

## 关键依赖与配置

- `src/lib/http.ts` - HTTP 请求封装
- `localStorage.authToken` - Token 存储

## 核心逻辑

### 登录流程

1. 用户输入邮箱和密码
2. 调用 `httpPost("/api/proxy/user/doLogin", { email, password })`
3. 成功后将 Token 存入 `localStorage.authToken`
4. 使用 `router.replace("/main")` 跳转主页

### 路由保护

根页面 `src/app/page.tsx` 会检测 Token：
- 有 Token -> 跳转 `/main`
- 无 Token -> 跳转 `/auth/login`

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `page.tsx` | 登录页面主组件 |
| `layout.tsx` | 登录模块布局 |

## 变更记录 (Changelog)

### 2026-03-21 - 更新

- 主页新增 Task 功能入口

### 2026-03-19 - 初始化

- 创建模块文档
