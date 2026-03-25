"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentCard } from "./components/AgentCard";
import { AgentFormSheet } from "./components/AgentFormSheet";
import { DeleteConfirmDialog } from "./components/DeleteConfirmDialog";
import { Plus, Search, Loader2, Bot } from "lucide-react";
import type { AgentListItem, AgentDetail, AgentRequest, Model } from "@/types/agent";
import { mockAgentDetail, mockModels } from "./mocks";
import { agentService } from "@/services/agent.service"; 

export default function AgentHubPage() {
  // ============================================
  // 数据状态
  // ============================================
  const [agents, setAgents] = useState<AgentListItem[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // ============================================
  // 提交状态（创建/更新/删除共用）
  // ============================================
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // Dialog 状态
  // ============================================
  const [formSheetOpen, setFormSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AgentDetail | null>(null);
  const [deletingAgentId, setDeletingAgentId] = useState<string | null>(null);

  // ============================================
  // 数据加载
  // ============================================
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [agentsData , modelsData] = await Promise.all([
          agentService.getList(),
          agentService.getModels(),
        ]);
        setAgents(agentsData);
        setModels(modelsData);
      } catch (error) {
        console.error("加载数据失败:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // ============================================
  // 刷新列表
  // ============================================
  const refreshAgents = useCallback(async () => {
    try {
      const data = await agentService.getList();
      setAgents(data);
    } catch (error) {
      console.error("刷新 Agent 列表失败:", error);
    }
  }, []);

  // ============================================
  // CRUD 操作
  // ============================================
  const createAgent = useCallback(async (data: AgentRequest) => {
    setIsSubmitting(true);
    try {
      await agentService.create(data);
      console.log("创建 Agent:", data);
      await refreshAgents();
      setFormSheetOpen(false);
    } catch (error) {
      console.error("创建 Agent 失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshAgents]);

  const updateAgent = useCallback(async (id: string, data: AgentRequest) => {
    setIsSubmitting(true);
    try {
      await agentService.update(id, data);
      console.log("更新 Agent:", id, data);
      await refreshAgents();
      closeFormSheet();
    } catch (error) {
      console.error("更新 Agent 失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshAgents]);

  const deleteAgent = useCallback(async (id: string) => {
    setIsSubmitting(true);
    try {
      await agentService.delete(id);
      console.log("删除 Agent:", id);
      await refreshAgents();
      closeDeleteDialog();
    } catch (error) {
      console.error("删除 Agent 失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [refreshAgents]);

  const toggleAgentEnabled = useCallback(async (agent: AgentListItem) => {
    try {
      await agentService.toggleEnabled(agent.id, !agent.enabled);
      console.log("切换状态:", agent.id, !agent.enabled);
      await refreshAgents();
    } catch (error) {
      console.error("切换 Agent 状态失败:", error);
    }
  }, [refreshAgents]);

  // ============================================
  // Dialog 控制
  // ============================================
  const openCreateSheet = useCallback(() => {
    setEditingAgent(null);
    setFormSheetOpen(true);
  }, []);

  const openEditSheet = useCallback(async (agent: AgentListItem) => {
    try {
      const detail = await agentService.getById(agent.id);
      setEditingAgent(detail);
      setFormSheetOpen(true);
    } catch (error) {
      console.error("获取 Agent 详情失败:", error);
    }
  }, []);

  const closeFormSheet = useCallback(() => {
    setFormSheetOpen(false);
    setEditingAgent(null);
  }, []);

  const openDeleteDialog = useCallback((agent: AgentListItem) => {
    setDeletingAgentId(agent.id);
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setDeletingAgentId(null);
  }, []);

  // ============================================
  // 表单提交
  // ============================================
  const handleFormSubmit = useCallback((data: AgentRequest) => {
    if (editingAgent) {
      return updateAgent(editingAgent.id, data);
    }
    return createAgent(data);
  }, [editingAgent, createAgent, updateAgent]);

  // ============================================
  // 搜索过滤
  // ============================================
  const filteredAgents = useMemo(() => {
    if (!searchQuery.trim()) return agents;
    const query = searchQuery.toLowerCase();
    return agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(query) ||
        agent.description.toLowerCase().includes(query)
    );
  }, [agents, searchQuery]);

  // ============================================
  // 删除确认数据
  // ============================================
  const deletingAgent = useMemo(() => {
    return agents.find(a => a.id === deletingAgentId) ?? null;
  }, [agents, deletingAgentId]);

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
        <Button onClick={openCreateSheet}>
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
        <EmptyState hasSearch={!!searchQuery} onCreate={openCreateSheet} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onEdit={openEditSheet}
              onDelete={openDeleteDialog}
              onToggleEnabled={toggleAgentEnabled}
            />
          ))}
        </div>
      )}

      {/* 创建/编辑侧边抽屉 */}
      <AgentFormSheet
        open={formSheetOpen}
        onOpenChange={(open) => open ? setFormSheetOpen(true) : closeFormSheet()}
        agent={editingAgent}
        models={models}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      {/* 删除确认对话框 */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => open ? setDeleteDialogOpen(true) : closeDeleteDialog()}
        agentName={deletingAgent?.name ?? ""}
        onConfirm={() => {
          if (deletingAgentId) {
            deleteAgent(deletingAgentId);
          }
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

// ============================================
// 空状态组件
// ============================================
function EmptyState({ hasSearch, onCreate }: { hasSearch: boolean; onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Bot className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg">暂无 Agent</h3>
      <p className="text-muted-foreground mt-1 mb-4">
        {hasSearch ? "没有找到匹配的 Agent" : "点击上方按钮创建第一个 Agent"}
      </p>
      {!hasSearch && (
        <Button onClick={onCreate}>
          <Plus className="mr-2 h-4 w-4" />
          新建 Agent
        </Button>
      )}
    </div>
  );
}
