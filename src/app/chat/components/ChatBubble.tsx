// app/chat/components/ChatBubble.tsx
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}


export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex items-start gap-3",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback
            className={cn(
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            {isUser ? (
              <User className="w-4 h-4" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </AvatarFallback>
        </Avatar>

        <div
          className={cn(
            "max-w-[80%] md:max-w-[70%] p-3 rounded-xl whitespace-pre-wrap text-sm shadow-sm",
            "animate-in fade-in-0 slide-in-from-bottom-1 duration-200",
            isUser
              ? "rounded-br-none bg-primary text-primary-foreground"
              : "rounded-tl-none bg-card border border-border/70"
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
