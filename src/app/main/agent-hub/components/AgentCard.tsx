"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot, MoreVertical, Pencil, Trash2, Cpu } from "lucide-react";
import type { AgentListItem } from "@/types/agent";

interface AgentCardProps {
  agent: AgentListItem;
  onEdit: (agent: AgentListItem) => void;
  onDelete: (agent: AgentListItem) => void;
  onToggleEnabled: (agent: AgentListItem) => void;
}

export function AgentCard({ agent, onEdit, onDelete, onToggleEnabled }: AgentCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 hover:border-primary/50 ${!agent.enabled ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg truncate">{agent.name}</CardTitle>
                {!agent.enabled && (
                  <Badge variant="secondary" className="text-xs">
                    已禁用
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-1 text-xs mt-0.5">
                {agent.description || "暂无描述"}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(agent)}>
                <Pencil className="h-4 w-4 mr-2" />
                编辑
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(agent)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* 模型 */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="font-normal">
            <Cpu className="h-3 w-3 mr-1" />
            {agent.modelName}
          </Badge>
        </div>

        {/* 启用开关和更新时间 */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Switch
              checked={agent.enabled}
              onCheckedChange={() => onToggleEnabled(agent)}
            />
            <span className="text-xs text-muted-foreground">
              {agent.enabled ? "已启用" : "已禁用"}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            更新于 {formatDate(agent.updatedAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
