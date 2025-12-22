"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Code, Settings, Zap, MemoryStick } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// 简化版 Agent 数据类型
interface AgentDetails {
  id: string;
  name: string;
  role: string;
  systemPrompt: string; // 核心：Agent Persona Prompt
  memoryId: string | null;
  toolIds: string[]; // 核心：引用的 MCP Service IDs
  // ... 其他配置
}

interface AgentDetailsSheetProps {
  agentId: string | null;
  onClose: () => void;
}

// 示例数据获取函数（实际应调用后端 API）
const fetchAgentDetails = (id: string): AgentDetails => {
  if (id === "self-001") {
    return {
      id: "self-001",
      name: "SelfAgent (核心)",
      role: "Persona",
      memoryId: "User-001",
      systemPrompt: `你是 Agent OS 的核心智能体。你的目标是作为用户（{user_name}）的数字分身。\n\n人格特征：\n- 冷静、理性、有条理。\n- 内敛但带有一点幽默感。\n- 说话直，但合理且友好。`,
      toolIds: ["mcp-search-001", "mcp-calendar-002"],
    };
  }
  // 模拟其他 Agent
  return {
    id: id,
    name: "未知 Agent",
    role: "Tool",
    systemPrompt: "",
    memoryId: null,
    toolIds: [],
  };
};

export function AgentDetailsSheet({
  agentId,
  onClose,
}: AgentDetailsSheetProps) {
  const [details, setDetails] = React.useState<AgentDetails | null>(null);

  React.useEffect(() => {
    if (agentId) {
      // 真实代码中应使用 try/catch 调用后端 /api/v1/agents/{id}
      setDetails(fetchAgentDetails(agentId));
    } else {
      setDetails(null);
    }
  }, [agentId]);

  if (!agentId || !details) {
    return <Sheet open={false} onOpenChange={onClose} />;
  }

  // 模拟保存操作
  const handleSave = () => {
    console.log("保存 Agent 配置:", details);
    // 真实代码中应调用后端 POST/PUT /api/v1/agents/{id}
    onClose();
  };

  // 模拟工具列表 (MCP Services)
  const availableTools = [
    { id: "mcp-search-001", name: "Google Search (Web Tool)" },
    { id: "mcp-calendar-002", name: "Calendar Manager (MCP)" },
    { id: "mcp-file-003", name: "Drive Indexer (MCP)" },
  ];

  return (
    <Sheet open={!!agentId} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col">
        <SheetHeader>
          <SheetTitle>⚙️ 配置 Agent: {details.name}</SheetTitle>
          <SheetDescription>
            编辑 Agent 的核心提示词、记忆设置和可用的 MCP 工具集。
          </SheetDescription>
        </SheetHeader>

        {/* 使用 Tabs 分离复杂配置 */}
        <Tabs defaultValue="prompt" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">
              <Settings className="h-4 w-4 mr-2" />
              基础信息
            </TabsTrigger>
            <TabsTrigger value="prompt">
              <Code className="h-4 w-4 mr-2" />
              AI 人格 (Prompt)
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Zap className="h-4 w-4 mr-2" />
              工具集 (MCP)
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4 p-1">
            {/* 1. 基础信息 Tab */}
            <TabsContent value="general" className="space-y-4">
              <div>
                <Label htmlFor="agent-name">名称</Label>
                <Input id="agent-name" defaultValue={details.name} />
              </div>
              <div>
                <Label htmlFor="agent-role">角色</Label>
                <Input id="agent-role" defaultValue={details.role} disabled />
              </div>
              <div className="flex items-center space-x-2">
                <MemoryStick className="h-5 w-5 text-purple-500" />
                <Label htmlFor="memory-id">会话记忆 ID (@MemoryId)</Label>
                <Input
                  id="memory-id"
                  defaultValue={details.memoryId ?? ""}
                  placeholder="e.g. User-001"
                />
              </div>
            </TabsContent>

            {/* 2. AI 人格 (Prompt) Tab - 核心配置 */}
            <TabsContent value="prompt" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                这是 Agent 的灵魂。请在这里定义你的语言风格、偏好和人设。
              </p>
              <div>
                <Label htmlFor="system-prompt">
                  System Prompt / AI 人格定义
                </Label>
                <Textarea
                  id="system-prompt"
                  value={details.systemPrompt}
                  onChange={(e) =>
                    setDetails({ ...details, systemPrompt: e.target.value })
                  }
                  rows={20}
                  className="font-mono text-xs"
                />
              </div>
            </TabsContent>

            {/* 3. 工具集 (MCP) Tab */}
            <TabsContent value="tools" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                勾选该 Agent 在执行任务时可以调用的 MCP 服务/工具。
              </p>
              <div className="space-y-2">
                {availableTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center space-x-3 p-2 border rounded-md"
                  >
                    <input
                      type="checkbox"
                      id={tool.id}
                      checked={details.toolIds.includes(tool.id)}
                      onChange={(e) => {
                        const newToolIds = e.target.checked
                          ? [...details.toolIds, tool.id]
                          : details.toolIds.filter((id) => id !== tool.id);
                        setDetails({ ...details, toolIds: newToolIds });
                      }}
                      className="h-4 w-4 text-primary rounded"
                    />
                    <Label htmlFor={tool.id} className="font-medium">
                      {tool.name}
                    </Label>
                    <Badge variant="secondary" className="ml-auto">
                      {tool.id}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>

          {/* 底部操作按钮 */}
          <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button onClick={handleSave}>保存配置</Button>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
