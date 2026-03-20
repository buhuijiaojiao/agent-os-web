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
        "group relative flex items-center justify-between px-3 py-2.5 rounded-lg text-sm",
        "transition-all duration-300 cursor-pointer",

        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {/* active glow */}
      {active && (
        <div className="absolute inset-0 rounded-lg bg-[#4ef2c2]/10" />
      )}

      {/* left indicator */}
      <div
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full",
          active ? "bg-[#4ef2c2]" : "bg-transparent",
        )}
      />

      {/* title */}
      <button
        onClick={onClick}
        className="truncate text-left flex-1 relative z-10"
      >
        {conversation.title}
      </button>

      {/* menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
              relative z-10 p-1 rounded opacity-0 group-hover:opacity-100
              text-muted-foreground hover:text-foreground transition
            "
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>Rename</DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            className="text-destructive focus:text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
