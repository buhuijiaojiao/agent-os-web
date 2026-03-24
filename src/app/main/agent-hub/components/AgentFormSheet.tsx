"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AgentFormContent } from "./AgentFormContent";
import type { AgentDetail, AgentRequest, Model } from "@/types/agent";

interface AgentFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent?: AgentDetail | null;
  models: Model[];
  onSubmit: (data: AgentRequest) => Promise<void>;
  isSubmitting: boolean;
}

export function AgentFormSheet({
  open,
  onOpenChange,
  agent,
  models,
  onSubmit,
  isSubmitting,
}: AgentFormSheetProps) {
  const formKey = agent?.id || "new";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:max-w-[540px] p-0 flex flex-col h-full">
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <SheetTitle>{agent ? "编辑 Agent" : "创建 Agent"}</SheetTitle>
          <SheetDescription>
            {agent
              ? "修改 Agent 的配置信息"
              : "创建一个新的智能体，配置其行为和能力"}
          </SheetDescription>
        </SheetHeader>

        <AgentFormContent
          key={formKey}
          agent={agent}
          models={models}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onOpenChange={onOpenChange}
        />
      </SheetContent>
    </Sheet>
  );
}
