// ============================================
// Agent 类型定义
// ============================================

/**
 * 可用模型
 */
export interface Model {
  id: string;
  name: string;
  provider: string;
}

/**
 * Agent 列表项（摘要）
 * GET /agents 返回
 */
export interface AgentListItem {
  id: string;
  name: string;
  description: string;
  modelName: string;
  enabled: boolean;
  updatedAt: number;
}

/**
 * Agent 绑定的工具信息
 * 包含在 AgentDetail 中，用于编辑回显
 */
export interface AgentTool {
  id: string;
  name: string;
  enabled: boolean;
}

/**
 * Agent 详情
 * GET /agents/:id 返回
 */
export interface AgentDetail {
  id: string;
  name: string;
  description: string;
  model: Model;
  temperature: number;
  prompt: string;
  tools: AgentTool[];
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

/**
 * Agent 工具绑定请求参数
 * 用于创建/更新时传递工具 ID 和启用状态
 */
export interface AgentToolBinding {
  toolId: string;
  enabled: boolean;
}

/**
 * Agent 创建/编辑请求
 */
export interface AgentRequest {
  name: string;
  description: string;
  modelId: string;
  temperature: number;
  prompt: string;
  tools: AgentToolBinding[];
}

