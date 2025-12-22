import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ConversationItemProps {
  conversation: { id: string; title: string };
  active: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ChatConversationItem({
  conversation,
  active,
  onClick,
  onEdit,
  onDelete,
}: ConversationItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between px-3 py-2 rounded-md text-sm border transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {/* 左侧点击进入会话 */}
      <button
        type="button"
        onClick={onClick}
        className="truncate text-left flex-1"
      >
        {conversation.title}
      </button>

      {/* 右侧三点菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
              active && "text-primary-foreground"
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>更新标题</DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="text-red-600 focus:text-red-600"
          >
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
