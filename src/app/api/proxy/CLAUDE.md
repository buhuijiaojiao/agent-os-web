[根目录](../../../CLAUDE.md) > [src/app](../../) > **api/proxy**

# API 代理模块

## 模块职责

作为前端与后端 Java 服务之间的代理层，统一处理跨域、请求转发和调试日志。

## 入口与启动

- **入口文件**: `src/app/api/proxy/[...path]/route.ts`
- **路由**: `/api/proxy/*` (通配符路由)

## 对外接口

### 支持的 HTTP 方法

- `GET` - 查询请求
- `POST` - 创建请求
- `PUT` - 更新请求
- `PATCH` - 部分更新
- `DELETE` - 删除请求

### 请求转发规则

```
前端请求: /api/proxy/conversation/list
后端目标: ${BACKEND_JAVA_URL}/conversation/list
```

## 关键依赖与配置

### 环境变量

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `BACKEND_JAVA_URL` | 是 | 后端 Java 服务地址 |
| `DEBUG_PROXY` | 否 | 是否开启调试日志 (true/false) |

### 配置示例

```env
BACKEND_JAVA_URL=http://localhost:8080/api/v1
DEBUG_PROXY=true
```

## 核心逻辑

### 请求处理流程

1. 解析请求路径，提取后端目标路径
2. 构建完整的后端 URL
3. 转发请求头和请求体
4. 返回后端响应或错误信息

### 错误处理

- 后端请求失败返回 `502 Bad Gateway`
- 配置缺失抛出启动错误

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `route.ts` | 代理路由处理器 |

## 变更记录 (Changelog)

### 2026-03-21 - 更新

- 无功能变更

### 2026-03-19 - 初始化

- 创建模块文档
