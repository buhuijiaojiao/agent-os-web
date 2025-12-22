import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
            "max-w-[80%] md:max-w-[70%] p-3 rounded-xl text-sm shadow-sm",
            "animate-in fade-in-0 slide-in-from-bottom-1 duration-200",
            isUser
              ? "rounded-br-none bg-primary text-primary-foreground"
              : "rounded-tl-none bg-card border border-border/70"
          )}
        >
          {isUser ? (
            // 用户消息：纯文本
            <pre className="whitespace-pre-wrap font-sans">{content}</pre>
          ) : (
            // AI 消息：Markdown 渲染
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
