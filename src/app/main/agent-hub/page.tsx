"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentCard } from "./components/AgentCard";
import { AgentFormSheet } from "./components/AgentFormSheet";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
// import { agentService } from "@/services/agent.service"; // 后端 API 就绪后取消注释
import { Plus, Search, Loader2, Bot } from "lucide-react";
import type { AgentListItem, AgentDetails, AgentRequest, Tool, Model } from "@/types/agent";

// Mock 数据 - 后端 API 就绪后删除
const mockAgentList: AgentListItem[] = [
  {
    id: "agent-001",
    name: "SelfAgent",
    description: "我的数字分身，负责所有日常对话和事务处理",
    model: "gpt-4o",
    enabled: true,
    updatedAt: Date.now() - 3600000,
  },
  {
    id: "agent-002",
    name: "FileIndexer",
    description: "负责检索、总结和上传 Drive/文件",
    model: "gpt-4o-mini",
    enabled: true,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: "agent-003",
    name: "Scheduler",
    description: "管理日历、提醒和时间安排",
    model: "claude-sonnet-4-6",
    enabled: false,
    updatedAt: Date.now() - 7200000,
  },
];

const mockAgentDetails: Record<string, AgentDetails> = {
  "agent-001": {
    id: "agent-001",
    name: "SelfAgent",
    description: "我的数字分身，负责所有日常对话和事务处理",
    model: "gpt-4o",
    temperature: 0.7,
    prompt: "你是 Agent OS 的核心智能体。你的目标是作为用户的数字分身。",
    toolIds: ["tool-search", "tool-calendar"],
    enabled: true,
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 3600000,
  },
  "agent-002": {
    id: "agent-002",
    name: "FileIndexer",
    description: "负责检索、总结和上传 Drive/文件",
    model: "gpt-4o-mini",
    temperature: 0.3,
    prompt: "你是一个文件管理助手，帮助用户组织和检索文件。",
    toolIds: ["tool-file"],
    enabled: true,
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000,
  },
  "agent-003": {
    id: "agent-003",
    name: "Scheduler",
    description: "管理日历、提醒和时间安排",
    model: "claude-sonnet-4-6",
    temperature: 0.5,
    prompt: "你是一个日程管理助手，帮助用户安排和管理时间。",
    toolIds: ["tool-calendar", "tool-email"],
    enabled: false,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 7200000,
  },
};

const mockTools: Tool[] = [
  { id: "tool-search", name: "Google Search", description: "搜索互联网信息" },
  { id: "tool-calendar", name: "Calendar Manager", description: "管理日历和提醒" },
  { id: "tool-file", name: "File Indexer", description: "索引和检索文件" },
  { id: "tool-email", name: "Email Assistant", description: "发送和管理邮件" },
];

const mockModels: Model[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "Anthropic" },
  { id: "claude-opus-4-6", name: "Claude Opus 4.6", provider: "Anthropic" },
];

export default function AgentHubPage() {
  // 列表状态（仅摘要）
  const [agents, setAgents] = useState<AgentListItem[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog 状态
  const [formSheetOpen, setFormSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AgentDetails | null>(null);
  const [deletingAgent, setDeletingAgent] = useState<AgentListItem | null>(null);

  // 加载列表
  async function loadAgents() {
    setIsLoading(true);
    try {
      // 后端 API 就绪后使用：
      // const data = await agentService.getList();
      // setAgents(data);
      setAgents(mockAgentList);
    } catch (error) {
      console.error("加载 Agent 列表失败:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadTools() {
    try {
      // 后端 API 就绪后使用：
      // const data = await agentService.getTools();
      // setTools(data);
      setTools(mockTools);
    } catch (error) {
      console.error("加载工具列表失败:", error);
    }
  }

  async function loadModels() {
    try {
      // 后端 API 就绪后使用：
      // const data = await agentService.getModels();
      // setModels(data);
      setModels(mockModels);
    } catch (error) {
      console.error("加载模型列表失败:", error);
    }
  }

  // 创建 Agent
  async function createAgent(data: AgentRequest) {
    setIsSubmitting(true);
    try {
      // 后端 API 就绪后使用：
      // await agentService.create(data);
      console.log("创建 Agent:", data);
      await loadAgents();
      setFormSheetOpen(false);
    } catch (error) {
      console.error("创建 Agent 失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // 更新 Agent
  async function updateAgent(id: string, data: AgentRequest) {
    setIsSubmitting(true);
    try {
      // 后端 API 就绪后使用：
      // await agentService.update(id, data);
      console.log("更新 Agent:", id, data);
      await loadAgents();
      setFormSheetOpen(false);
      setEditingAgent(null);
    } catch (error) {
      console.error("更新 Agent 失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // 切换 Agent 启用状态
  async function toggleAgentEnabled(agent: AgentListItem) {
    try {
      // 后端 API 就绪后使用：
      // await agentService.toggleEnabled(agent.id, !agent.enabled);
      console.log("切换状态:", agent.id, !agent.enabled);
      await loadAgents();
    } catch (error) {
      console.error("切换 Agent 状态失败:", error);
    }
  }

  // 删除 Agent
  async function deleteAgent(id: string) {
    setIsSubmitting(true);
    try {
      // 后端 API 就绪后使用：
      // await agentService.delete(id);
      console.log("删除 Agent:", id);
      await loadAgents();
      setDeleteDialogOpen(false);
      setDeletingAgent(null);
    } catch (error) {
      console.error("删除 Agent 失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // 提交表单
  async function handleSubmit(data: AgentRequest) {
    if (editingAgent) {
      await updateAgent(editingAgent.id, data);
    } else {
      await createAgent(data);
    }
  }

  // 初始化
  useEffect(() => {
    loadAgents();
    loadTools();
    loadModels();
  }, []);

  // 搜索过滤
  const filteredAgents = useMemo(() => {
    if (!searchQuery.trim()) return agents;
    const query = searchQuery.toLowerCase();
    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(query) ||
        agent.description.toLowerCase().includes(query)
    );
  }, [agents, searchQuery]);

  // 打开创建对话框
  function handleCreate() {
    setEditingAgent(null);
    setFormSheetOpen(true);
  }

  // 打开编辑对话框 - 根据 id 查询详情
  async function handleEdit(agent: AgentListItem) {
    try {
      // 后端 API 就绪后使用：
      // const details = await agentService.getById(agent.id);
      // setEditingAgent(details);
      const details = mockAgentDetails[agent.id];
      setEditingAgent(details || null);
      setFormSheetOpen(true);
    } catch (error) {
      console.error("获取 Agent 详情失败:", error);
    }
  }

  // 打开删除确认框
  function handleDeleteClick(agent: AgentListItem) {
    setDeletingAgent(agent);
    setDeleteDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agent Hub</h1>
        <p className="text-muted-foreground mt-1">
          管理和配置智能体，定义其行为和能力
        </p>
      </div>

      {/* 操作栏 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索 Agent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          新建 Agent
        </Button>
      </div>

      {/* Agent 列表 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-lg">暂无 Agent</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            {searchQuery ? "没有找到匹配的 Agent" : "点击上方按钮创建第一个 Agent"}
          </p>
          {!searchQuery && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              新建 Agent
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onToggleEnabled={toggleAgentEnabled}
            />
          ))}
        </div>
      )}

      {/* 创建/编辑侧边抽屉 */}
      <AgentFormSheet
        open={formSheetOpen}
        onOpenChange={setFormSheetOpen}
        agent={editingAgent}
        tools={tools}
        models={models}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* 删除确认对话框 */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        agentName={deletingAgent?.name || ""}
        onConfirm={() => deleteAgent(deletingAgent!.id)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
