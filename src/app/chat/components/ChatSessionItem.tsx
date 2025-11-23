import { cn } from "@/lib/utils";

export default function ChatSessionItem({
  session,
  active,
  onClick,
}: {
  session: { id: string; title: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-3 rounded-md border cursor-pointer text-sm",
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {session.title}
    </div>
  );
}
