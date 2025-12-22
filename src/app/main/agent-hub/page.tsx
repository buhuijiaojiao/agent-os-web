"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentCard } from "./components/AgentCard";
import { AgentDetailsSheet } from "./components/AgentDetailsSheet";
import { Plus } from "lucide-react";

// 示例数据结构 (与后端数据模型对应)
const dummyAgents = [
  {
    id: "self-001",
    name: "SelfAgent (核心)",
    role: "Persona",
    description: "我的数字分身，负责所有日常对话和事务。",
    tools: 3,
    memoryId: "User-001",
  },
  {
    id: "mcp-file-002",
    name: "FileIndexer",
    role: "MCP/Tool",
    description: "负责检索、总结和上传 Drive/文件。",
    tools: 1,
    memoryId: null,
  },
  {
    id: "mcp-schedule-003",
    name: "Scheduler",
    role: "MCP/Tool",
    description: "管理日历、提醒和时间安排。",
    tools: 2,
    memoryId: "User-001",
  },
];

export default function AgentHubPage() {
  // 实际项目中，这里会管理列表数据、搜索状态和当前选中的 Agent
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(
    null
  );

  const handleAgentClick = (id: string) => {
    setSelectedAgentId(id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        👥 Agent Hub（智能体中心）
      </h1>
      <p className="text-muted-foreground">
        管理和配置 Agent OS 中所有可用的智能体及其工具集。
      </p>

      {/* A. 顶部操作栏 */}
      <div className="flex items-center space-x-4">
        <Input placeholder="搜索 Agent 名称或描述..." className="max-w-sm" />
        {/* 实际应用中可以添加 Filter Select */}
        <Button onClick={() => console.log("创建新 Agent")}>
          <Plus className="mr-2 h-4 w-4" /> 新建 Agent
        </Button>
      </div>

      {/* B. Agent 列表区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onClick={() => handleAgentClick(agent.id)}
          />
        ))}
      </div>

      {/* C. Agent 详情侧边栏 */}
      <AgentDetailsSheet
        agentId={selectedAgentId}
        onClose={() => setSelectedAgentId(null)}
      />
    </div>
  );
}
