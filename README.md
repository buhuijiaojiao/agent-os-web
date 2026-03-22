<div align="center">

# 🚀 Agent OS Web

### *Your Personal AI Team Operating System - Frontend*

<p align="center">
  <em>Build, lead, and extend your own AI Agent Team.</em>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a>
</p>

</div>

---

## 🌟 Overview

> 在大模型能力持续增强的背景下，**个人能力的边界正在迅速模糊**。
> 真正的竞争力，不再来自于"一个人能做多少"，
> 而是来自于：
>
> **一个人能调动、指挥多强的 AI 团队为自己工作。**

**Agent OS Web** 是 Agent OS 生态系统的前端界面，旨在为用户提供一个优雅、智能的个人操作系统体验。系统集成了 AI 对话、智能体管理、任务执行控制台、博客撰写等核心功能。

---

## ✨ Features

### 核心模块

| 模块 | 描述 | 状态 |
|------|------|------|
| 💬 **对话系统** | AI 对话、会话管理、消息渲染、Markdown 支持 | ✅ 已完成 |
| 🤖 **智能体中心** | Agent 配置、Prompt 管理、MCP 工具绑定 | ✅ 已完成 |
| 📋 **任务控制台** | 任务执行、执行时间线、历史记录、执行控制 | ✅ 已完成 |
| 📝 **博客系统** | 博客文章展示与阅读 | ✅ 已完成 |
| 🔐 **认证系统** | 用户登录、Token 管理、自动跳转 | ✅ 已完成 |

### 系统特性

- 🌓 **主题切换** - 支持深色/浅色/跟随系统三种模式
- 📱 **响应式布局** - 可折叠侧边栏，适配不同屏幕
- 🔄 **状态持久化** - 基于 Zustand 的状态管理，支持 localStorage 持久化
- 🎨 **精致 UI** - 基于 Radix UI 的组件库，优雅的动画效果

---

## 🛠 Tech Stack

| 层级 | 技术选型 |
|------|----------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript 5 |
| UI 库 | React 19 |
| 样式 | Tailwind CSS 4 |
| 组件库 | Radix UI (shadcn/ui 风格) |
| 状态管理 | Zustand 5 (持久化存储) |
| 图标 | Lucide React |
| Markdown | react-markdown + remark-gfm |
| 主题 | next-themes |
| 包管理 | pnpm |

---

## 📦 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── api/proxy/              # 后端 API 代理
│   ├── auth/login/             # 登录模块
│   └── main/                   # 主应用区域
│       ├── components/layout/  # 布局组件
│       ├── agent-hub/          # 智能体中心
│       ├── blog/               # 博客模块
│       ├── chat/               # 对话模块
│       └── task/               # 任务控制台
├── components/
│   ├── ui/                     # 基础 UI 组件
│   ├── theme-provider.tsx      # 主题提供者
│   └── theme-toggle.tsx        # 主题切换
├── hooks/                      # 自定义 Hooks
├── services/                   # API 服务层
├── store/                      # Zustand 状态管理
├── types/                      # TypeScript 类型定义
└── lib/                        # 工具函数
```

---

## 🚀 Quick Start

### 环境要求

- Node.js >= 18
- pnpm (推荐)

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/your-username/agent-os-web.git

# 进入目录
cd agent-os-web

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，设置 BACKEND_JAVA_URL

# 启动开发服务
pnpm dev
```

### 环境变量

创建 `.env.local` 文件：

```env
BACKEND_JAVA_URL=http://localhost:8080/api
DEBUG_PROXY=true
```

### 常用命令

| 命令 | 描述 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm start` | 启动生产服务 |
| `pnpm lint` | 代码检查 |

---

## 🗺 Roadmap

- [ ] 知识库模块
- [ ] 日志系统
- [ ] Agent 协作编排
- [ ] 工具执行引擎
- [ ] 多语言支持

---

## 🤝 Contribute

项目仍处于早期阶段，暂未开放正式贡献流程。
后续将通过 Issue / PR 的方式逐步引入社区参与。

---

## 📄 License

MIT License

---

<div align="center">

**Agent OS Web is just getting started.**

</div>
