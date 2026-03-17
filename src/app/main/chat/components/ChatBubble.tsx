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
                ? "bg-white/10 text-white"
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
              ? "bg-white/5 text-white/90 rounded-br-md"
              : "bg-white/[0.03] border border-white/10 rounded-tl-md",
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
                className="prose prose-sm max-w-none prose-invert
                              prose-p:my-2 prose-code:text-[#4ef2c2]"
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
