[根目录](../../../../CLAUDE.md) > [src/app](../../) > [main](../) > **blog**

# 博客系统模块

## 模块职责

展示博客文章列表和文章详情，提供 AI 辅助写作的入口。

## 入口与启动

- **入口文件**: `src/app/main/blog/page.tsx`
- **详情页**: `src/app/main/blog/[slug]/page.tsx`
- **路由**: `/main/blog`, `/main/blog/[slug]`

## 对外接口

### 文章数据结构

```typescript
interface Post {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}
```

## 关键依赖与配置

- `@/components/ui/card` - 卡片组件
- `@/components/ui/badge` - 标签组件
- `next/link` - 路由链接

## 当前状态

- 使用 Mock 数据，未连接后端 API
- 详情页 `[slug]/page.tsx` 存在但未实现

## 组件架构

```
page.tsx (文章列表)
└── Card (文章卡片，点击跳转详情)
```

## Mock 数据

```typescript
const mockPosts = [
  {
    title: "欢迎来到我的博客",
    description: "这里记录了我的思考、构建、设计过程……",
    date: "2025-05-08",
    tags: ["随笔", "生活"],
    slug: "welcome",
  },
  {
    title: "Agent OS：我正在构建的个人操作系统",
    description: "关于我为什么要做 Agent OS，它未来要成为什么。",
    date: "2025-05-07",
    tags: ["技术", "AI"],
    slug: "agent-os-intro",
  },
];
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `page.tsx` | 博客列表页 |
| `[slug]/page.tsx` | 博客详情页 (待实现) |

## 待完成功能

1. 连接后端 API 获取真实文章数据
2. 实现文章详情页
3. 集成 AI 辅助写作功能

## 变更记录 (Changelog)

### 2026-03-19 - 初始化

- 创建模块文档
