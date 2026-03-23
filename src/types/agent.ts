// ============================================
// Agent 类型定义
// ============================================

/**
 * Agent 列表项（摘要）
 * GET /agents 返回
 */
export interface AgentListItem {
  id: string;
  name: string;
  description: string;
  model: string;
  enabled: boolean;
  updatedAt: number;
}

/**
 * Agent 详情
 * GET /agents/:id 返回
 */
export interface AgentDetails {
  id: string;
  name: string;
  description: string;
  model: string;
  temperature: number;
  prompt: string;
  toolIds: string[];
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

/**
 * Agent 创建/编辑请求
 */
export interface AgentRequest {
  name: string;
  description: string;
  model: string;
  temperature: number;
  prompt: string;
  toolIds: string[];
}

/**
 * Tool 定义
 */
export interface Tool {
  id: string;
  name: string;
  description: string;
  category?: string;
}

/**
 * 可用模型
 */
export interface Model {
  id: string;
  name: string;
  provider: string;
}

