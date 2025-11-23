import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Brain, Zap, MemoryStick } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  tools: number;
  memoryId: string | null;
}

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const getRoleColor = (role: string) => {
    if (role.includes("Persona")) return "bg-sky-500 hover:bg-sky-600";
    if (role.includes("Tool")) return "bg-emerald-500 hover:bg-emerald-600";
    return "bg-gray-500 hover:bg-gray-600";
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{agent.name}</CardTitle>
          <Badge className={getRoleColor(agent.role)}>{agent.role}</Badge>
        </div>
        <CardDescription className="line-clamp-2 min-h-[40px]">
          {agent.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Brain className="mr-2 h-4 w-4 text-primary" />
          <span>**Prompt ID:** {agent.id}</span>
        </div>
        <div className="flex items-center">
          <Zap className="mr-2 h-4 w-4 text-yellow-500" />
          <span>**工具数量:** {agent.tools} 个</span>
        </div>
        <div className="flex items-center">
          <MemoryStick className="mr-2 h-4 w-4 text-purple-500" />
          <span>**记忆 ID:** {agent.memoryId ?? "无独立记忆"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          配置
        </Button>
      </CardFooter>
    </Card>
  );
}
