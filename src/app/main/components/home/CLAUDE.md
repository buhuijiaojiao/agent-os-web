[根目录](../../../../../CLAUDE.md) > [src/app](../../../) > [main](../../) > [components](../) > **home**

# 首页组件模块

## 模块职责

提供首页欢迎面板所需的组件，包括统计卡片和最近活动列表。

## 入口与启动

这是一个纯组件模块，由 `src/app/main/page.tsx` 引入使用。

## 对外接口

### StatCard - 统计卡片

```typescript
import { StatCard } from "./components/home/StatCard";
import type { StatItem } from "./components/home/types";

interface StatItem {
  icon: LucideIcon;   // 图标组件
  label: string;      // 标签名称
  value: number | string;  // 数值
  trend?: string;     // 趋势标识（如 "+12"）
}

<StatCard stat={statItem} />
```

### RecentActivity - 最近活动列表

```typescript
import { RecentActivity } from "./components/home/RecentActivity";
import type { ActivityItem } from "./components/home/types";

interface ActivityItem {
  id: string;
  type: ActivityType;  // "chat" | "task" | "agent"
  title: string;
  description?: string;
  time: string;
  href: string;
}

<RecentActivity activities={activityItems} />
```

### 类型定义

```typescript
import type { StatItem, ActivityItem, ActivityType, ActivityTypeConfig } from "./components/home/types";

type ActivityType = "chat" | "task" | "agent";

interface ActivityTypeConfig {
  label: string;
  color: string;
}

// 预设配置
const activityTypeConfig: Record<ActivityType, ActivityTypeConfig> = {
  chat: { label: "对话", color: "text-blue-400" },
  task: { label: "任务", color: "text-amber-400" },
  agent: { label: "Agent", color: "text-purple-400" },
};
```

## 关键依赖与配置

- `@/components/ui/card` - 卡片组件（StatCard 样式参考）
- `lucide-react` - 图标库
- `next/link` - 链接组件（RecentActivity 使用）

## 组件说明

### StatCard

展示单个统计数据的卡片：

- 主题色图标背景
- 数值和趋势显示
- 标签说明
- 悬停效果

### RecentActivity

展示最近活动列表：

- 按类型显示不同颜色图标
- 显示标题、描述、时间
- 点击跳转到对应页面
- 支持空状态显示

## 相关文件清单

| 文件 | 说明 |
|------|------|
| `StatCard.tsx` | 统计卡片组件 |
| `RecentActivity.tsx` | 最近活动列表组件 |
| `types.ts` | 类型定义和预设配置 |

## 变更记录 (Changelog)

### 2026-03-25 - 初始化

- 创建首页组件模块
- 实现 StatCard 统计卡片
- 实现 RecentActivity 最近活动列表
- 定义类型和预设配置
