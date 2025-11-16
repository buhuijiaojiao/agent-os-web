# 🧠 Agent OS Web

**你的个人操作系统 · Your Personal Operating System**

Agent OS Web 是一个聚合「个人主页、数字分身、自动化工作站」的统一平台。
它不仅是一个网站，更是一个围绕你构建的 **数字中枢系统（Digital Core）**。

---

## 🚀 项目愿景

打造一个 **24 小时在线、可进化、可扩展** 的个人数字宇宙——
既能作为对外展示的 **个人站点**，
又能作为你自己使用的 **工作控制台（Dashboard）**，
还能够作为 **数字分身（AI Agent）** 的运行平台。

一句话：
**让你的所有事务、内容、自动化能力，都通过一个入口统一管理。**

---

## ✨ 核心特性（建设中）

### 🔹 个人主页（Public）

* 简洁清晰的首页
* 博客 / 文章系统
* 对外开放的 AI 聊天窗口（访客与数字分身对话）

### 🔹 工作站 Dashboard（Internal）

* 可扩展的后台布局（Sidebar + Main）
* 工具管理（Tools）
* 自动化任务中心（Tasks）
* 记忆 / 知识库（Memory）
* 系统设置（Settings）
* Agent 的行为日志与观察面板

### 🔹 数字分身（AI Agent）

* 你的行业经验、人格、决策风格
* 可插件化扩展的行动能力
* 能通过 MCP / API 执行实际任务
* 可与访客自由交流，也可处理你的工作事务

---

## 🧩 技术栈

### 前端

* **Next.js 16** — App Router 架构
* **Tailwind CSS v4** — 现代化样式系统
* **shadcn/ui** — 可组合、可维护、极简美观的 UI 组件集
* **TypeScript** — 类型安全

### 后端（可选）

视你的需求扩展：

* Java / Spring Boot（任务执行层、工具层）
* Node.js（轻量功能、Agent工具）
* MCP 工具（Python / Node / Java 均可）

---

## 📁 当前结构（精简示例）

```
src/
  app/
    layout.tsx            # 全局布局（导航）
    page.tsx              # 首页
    chat/                 # AI 聊天
    blog/                 # 博客
    dashboard/            # 工作站
      layout.tsx
      page.tsx
      tools/
      tasks/
      memory/
      settings/
  components/
  lib/
  styles/
```

---

## 🛠 开发指令

```bash
pnpm install
pnpm dev
```

访问：
[http://localhost:3000](http://localhost:3000)

---

## 🌌 未来规划

* 插件化（Tools）体系
* 任务调度引擎
* 可执行工作流（Workflows / Pipelines）
* Agent 多人格配置
* 长期记忆（Memory）
* 本地模型 / 自部署模型接入
* 更加智能的“数字自我”

---

## 📬 关于项目

Agent OS Web 是一个个人探索项目，旨在构建一个 **能替你思考、替你行动、替你管理数字生活** 的系统。
它不是一个展示品，而是一个会持续进化的「个人数字生物」。

**Your mind. Your agent. Your OS.**


