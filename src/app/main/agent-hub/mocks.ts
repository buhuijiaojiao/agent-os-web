// ============================================
// Agent Mock 数据
// 后端 API 就绪后删除此文件
// ============================================

import type { AgentListItem, AgentDetail, Model } from "@/types/agent";

export const mockModels: Model[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "Anthropic" },
  { id: "claude-opus-4-6", name: "Claude Opus 4.6", provider: "Anthropic" },
];

export const mockAgentList: AgentListItem[] = [
  {
    id: "agent-001",
    name: "SelfAgent",
    description: "我的数字分身，负责所有日常对话和事务处理",
    modelName: "GPT-4o",
    enabled: true,
    updatedAt: Date.now() - 3600000,
  },
  {
    id: "agent-002",
    name: "FileIndexer",
    description: "负责检索、总结和上传 Drive/文件",
    modelName: "GPT-4o Mini",
    enabled: true,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: "agent-003",
    name: "Scheduler",
    description: "管理日历、提醒和时间安排",
    modelName: "Claude Sonnet 4.6",
    enabled: false,
    updatedAt: Date.now() - 7200000,
  },
];

// 模拟按 ID 获取详情的接口
export const mockAgentDetail: Record<string, AgentDetail> = {
  "agent-001": {
    id: "agent-001",
    name: "SelfAgent",
    description: "我的数字分身，负责所有日常对话和事务处理",
    model: mockModels[0], // GPT-4o
    temperature: 0.7,
    prompt: "你是 Agent OS 的核心智能体。你的目标是作为用户的数字分身。",
    tools: [
      { id: "tool-search", name: "Google Search", enabled: true },
      { id: "tool-calendar", name: "Calendar Manager", enabled: true },
    ],
    enabled: true,
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 3600000,
  },
  "agent-002": {
    id: "agent-002",
    name: "FileIndexer",
    description: "负责检索、总结和上传 Drive/文件",
    model: mockModels[1], // GPT-4o Mini
    temperature: 0.3,
    prompt: "你是一个文件管理助手，帮助用户组织和检索文件。",
    tools: [
      { id: "tool-file", name: "File Indexer", enabled: true },
    ],
    enabled: true,
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000,
  },
  "agent-003": {
    id: "agent-003",
    name: "Scheduler",
    description: "管理日历、提醒和时间安排",
    model: mockModels[2], // Claude Sonnet 4.6
    temperature: 0.5,
    prompt: "你是一个日程管理助手，帮助用户安排和管理时间。",
    tools: [
      { id: "tool-calendar", name: "Calendar Manager", enabled: true },
      { id: "tool-email", name: "Email Assistant", enabled: false },
    ],
    enabled: false,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 7200000,
  },
};
