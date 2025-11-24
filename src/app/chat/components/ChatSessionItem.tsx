// app/chat/components/ChatSessionItem.tsx
import { cn } from "@/lib/utils";

interface ChatSessionItemProps {
  session: { id: string; title: string };
  active: boolean;
  onClick: () => void;
}

export default function ChatSessionItem({
  session,
  active,
  onClick,
}: ChatSessionItemProps) {
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
      <span className="truncate block">{session.title}</span>
    </button>
  );
}
