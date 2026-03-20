[根目录](../../../CLAUDE.md) > [src](../) > **components/ui**

# UI 组件库模块

## 模块职责

提供项目的基础 UI 组件，基于 Radix UI 原语封装，遵循 shadcn/ui 设计规范。

## 入口与启动

这是一个纯组件库模块，无入口文件，通过具名导入使用。

## 对外接口

### 可用组件

| 组件 | 文件 | 说明 |
|------|------|------|
| `Button` | `button.tsx` | 按钮 |
| `Input` | `input.tsx` | 输入框 |
| `Textarea` | `textarea.tsx` | 多行文本框 |
| `Label` | `label.tsx` | 表单标签 |
| `Card` 系列 | `card.tsx` | 卡片容器 |
| `Badge` | `badge.tsx` | 标签徽章 |
| `Avatar` | `avatar.tsx` | 头像 |
| `Dialog` 系列 | `dialog.tsx` | 对话框 |
| `Sheet` 系列 | `sheet.tsx` | 侧边抽屉 |
| `Tabs` 系列 | `tabs.tsx` | 标签页 |
| `ScrollArea` | `scroll-area.tsx` | 滚动区域 |
| `Separator` | `separator.tsx` | 分隔线 |
| `Tooltip` | `tooltip.tsx` | 工具提示 |
| `DropdownMenu` 系列 | `dropdown-menu.tsx` | 下拉菜单 |

## 关键依赖与配置

### Radix UI 包

- `@radix-ui/react-avatar`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-separator`
- `@radix-ui/react-slot`
- `@radix-ui/react-tabs`
- `@radix-ui/react-tooltip`

### 样式工具

- `class-variance-authority` - 变体样式管理
- `clsx` - 类名合并
- `tailwind-merge` - Tailwind 类名去重

## 设计规范

### 变体 (Variants)

大多数组件支持以下变体：

```typescript
// Button 示例
variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
size: "default" | "sm" | "lg" | "icon"
```

### 样式约定

- 使用 `cn()` 函数合并类名
- 遵循全局 CSS 变量 (`--color-*`)
- 支持深色/浅色主题

## 使用示例

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

<Button variant="outline" size="sm">点击</Button>

<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>
```

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `button.tsx` | 按钮组件 |
| `input.tsx` | 输入框组件 |
| `textarea.tsx` | 多行文本组件 |
| `label.tsx` | 标签组件 |
| `card.tsx` | 卡片组件 |
| `badge.tsx` | 徽章组件 |
| `avatar.tsx` | 头像组件 |
| `dialog.tsx` | 对话框组件 |
| `sheet.tsx` | 抽屉组件 |
| `tabs.tsx` | 标签页组件 |
| `scroll-area.tsx` | 滚动区域组件 |
| `separator.tsx` | 分隔线组件 |
| `tooltip.tsx` | 提示组件 |
| `dropdown-menu.tsx` | 下拉菜单组件 |

## 变更记录 (Changelog)

### 2026-03-21 - 更新

- 无新增组件

### 2026-03-19 - 初始化

- 创建模块文档
