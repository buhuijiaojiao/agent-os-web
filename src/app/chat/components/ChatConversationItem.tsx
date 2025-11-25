// app/chat/components/ChatConversationItem.tsx
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  conversation: { id: string; title: string };
  active: boolean;
  onClick: () => void;
}

// FIX: 导出组件名已更改
export default function ChatConversationItem({
  conversation,
  active,
  onClick,
}: ConversationItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 rounded-md text-sm border transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <span className="truncate block">{conversation.title}</span>
    </button>
  );
}
