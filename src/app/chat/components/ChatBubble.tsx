import { cn } from "@/lib/utils";

export default function ChatBubble({
  role,
  content,
}: {
  role: "user" | "agent";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
          A
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] p-3 rounded-lg whitespace-pre-wrap text-sm shadow-sm",
          isUser
            ? "bg-black text-white ml-auto"
            : "bg-white border text-gray-900"
        )}
      >
        {content}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
          U
        </div>
      )}
    </div>
  );
}
