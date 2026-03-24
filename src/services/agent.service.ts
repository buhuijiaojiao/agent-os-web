import { httpGet, httpPost, httpPut, httpDelete } from '@/lib/http';
import type { AgentListItem, AgentDetail, AgentRequest, Model } from '@/types/agent';

export const agentService = {
  /**
   * 获取 Agent 列表（摘要）
   */
  getList: () => httpGet<AgentListItem[]>('/api/proxy/agents'),

  /**
   * 获取 Agent 详情（含绑定的工具信息）
   */
  getById: (id: string) => httpGet<AgentDetail>(`/api/proxy/agents/${id}`),

  /**
   * 创建 Agent
   */
  create: (data: AgentRequest) => httpPost<void>('/api/proxy/agents', data),

  /**
   * 更新 Agent
   */
  update: (id: string, data: AgentRequest) =>
    httpPut<void>(`/api/proxy/agents/${id}`, data),

  /**
   * 删除 Agent
   */
  delete: (id: string) => httpDelete<void>(`/api/proxy/agents/${id}`),

  /**
   * 切换启用状态
   */
  toggleEnabled: (id: string, enabled: boolean) =>
    httpPut<void>(`/api/proxy/agents/${id}/enabled`, { enabled }),

  /**
   * 获取可用模型列表
   */
  getModels: () => httpGet<Model[]>('/api/proxy/models'),
};
