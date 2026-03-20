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
    <div className="w-full group">
      <div
        className={cn(
          "flex items-start gap-3",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
      >
        {/* Avatar */}
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback
            className={cn(
              "transition-all",
              isUser
                ? "bg-muted text-foreground"
                : "bg-[#4ef2c2]/20 text-[#4ef2c2]",
            )}
          >
            {isUser ? (
              <User className="w-4 h-4" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </AvatarFallback>
        </Avatar>

        {/* Bubble */}
        <div
          className={cn(
            "relative max-w-[80%] md:max-w-[65%]",
            "px-4 py-3 rounded-2xl text-sm",
            "transition-all duration-300",
            "animate-in fade-in-0 slide-in-from-bottom-2",

            isUser
              ? "bg-muted text-foreground rounded-br-md"
              : "bg-muted/50 border border-border rounded-tl-md",
          )}
        >
          {/* subtle glow for AI */}
          {!isUser && (
            <div
              className="
                pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                transition duration-500
                bg-[radial-gradient(circle_at_top_left,rgba(78,242,194,0.15),transparent_60%)]
              "
            />
          )}

          {/* content */}
          <div className="relative z-10 leading-relaxed">
            {isUser ? (
              <p className="whitespace-pre-wrap">{content}</p>
            ) : (
              <div
                className="prose prose-sm max-w-none
                              prose-p:my-2 prose-p:text-foreground
                              prose-headings:text-foreground
                              prose-strong:text-foreground
                              prose-code:text-[#4ef2c2] prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                              prose-pre:bg-muted prose-pre:text-foreground
                              prose-a:text-[#4ef2c2]
                              prose-blockquote:text-muted-foreground
                              prose-li:text-foreground"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
