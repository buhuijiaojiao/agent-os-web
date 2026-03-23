"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2, Sparkles, Settings2, Wrench } from "lucide-react";
import type { AgentDetails, AgentRequest, Tool, Model } from "@/types/agent";

interface AgentFormContentProps {
  agent?: AgentDetails | null;
  tools: Tool[];
  models: Model[];
  onSubmit: (data: AgentRequest) => Promise<void>;
  isSubmitting: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultFormData: AgentRequest = {
  name: "",
  description: "",
  model: "",
  temperature: 0.7,
  prompt: "",
  toolIds: [],
};

export function AgentFormContent({
  agent,
  tools,
  models,
  onSubmit,
  isSubmitting,
  onOpenChange,
}: AgentFormContentProps) {
  const defaultModel = models[0]?.id || "";

  const [formData, setFormData] = useState<AgentRequest>(() => {
    if (agent) {
      return {
        name: agent.name,
        description: agent.description,
        model: agent.model,
        temperature: agent.temperature,
        prompt: agent.prompt,
        toolIds: agent.toolIds,
      };
    }
    return {
      ...defaultFormData,
      model: defaultModel,
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleToolToggle = (toolId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      toolIds: checked
        ? [...prev.toolIds, toolId]
        : prev.toolIds.filter((id) => id !== toolId),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
      {/* 可滚动内容区 */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {/* 基本信息 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              基本信息
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  名称 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="例如：SelfAgent"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">描述</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="简要描述 Agent 的用途"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* 模型配置 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Settings2 className="h-4 w-4" />
              模型配置
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="model">
                  模型 <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.model}
                  onValueChange={(value) =>
                    setFormData({ ...formData, model: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择模型" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <span className="font-medium">{model.name}</span>
                        <span className="text-muted-foreground ml-2 text-xs">
                          · {model.provider}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature" className="text-sm">
                    Temperature
                  </Label>
                  <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
                    {formData.temperature.toFixed(1)}
                  </span>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={2}
                  step={0.1}
                  value={[formData.temperature]}
                  onValueChange={([value]) =>
                    setFormData({ ...formData, temperature: value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  较低值输出更确定，较高值输出更随机
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* System Prompt */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              System Prompt
            </div>

            <div className="grid gap-2">
              <Textarea
                id="prompt"
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, prompt: e.target.value })
                }
                placeholder="定义 Agent 的行为、人格和能力..."
                rows={5}
                className="font-mono text-sm resize-none"
              />
              <p className="text-xs text-muted-foreground">
                描述 Agent 的角色、行为方式和能力边界
              </p>
            </div>
          </div>

          <Separator />

          {/* 工具绑定 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Wrench className="h-4 w-4" />
                工具绑定
              </div>
              {formData.toolIds.length > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  已选择 {formData.toolIds.length} 个
                </span>
              )}
            </div>

            {tools.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6 border rounded-lg border-dashed">
                暂无可用工具
              </div>
            ) : (
              <div className="grid gap-2">
                {tools.map((tool) => (
                  <label
                    key={tool.id}
                    htmlFor={tool.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.toolIds.includes(tool.id)
                        ? "bg-primary/5 border-primary/30"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Checkbox
                      id={tool.id}
                      checked={formData.toolIds.includes(tool.id)}
                      onCheckedChange={(checked) =>
                        handleToolToggle(tool.id, checked as boolean)
                      }
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{tool.name}</div>
                      {tool.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {tool.description}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部操作栏 - 固定显示 */}
      <div className="flex-shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t bg-background">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isSubmitting}
        >
          取消
        </Button>
        <Button type="submit" disabled={isSubmitting || !formData.name || !formData.model}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {agent ? "保存更改" : "创建 Agent"}
        </Button>
      </div>
    </form>
  );
}
