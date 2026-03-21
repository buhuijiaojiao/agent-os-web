export interface Agent {
  id: string;
  name: string;
  role: string;          // "Persona" | "MCP/Tool"
  description: string;
  tools: number;         // 工具数量
  memoryId: string | null;  // 记忆 ID
}

export interface AgentDetails {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;  // AI 人格定义
  memoryId: string | null;
  toolIds: string[];     // 绑定的 MCP 工具 ID
}

export interface McpTool {
  id: string;
  name: string;
}
