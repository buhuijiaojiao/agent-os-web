"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface TaskResultProps {
  content: string;
  isLoading?: boolean;
}

export function TaskResult({ content, isLoading = false }: TaskResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <div className="w-12 h-12 rounded-full border-2 border-muted border-t-[#4ef2c2] animate-spin mb-4" />
        <p className="text-sm">正在生成结果...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-sm">任务执行完成后，结果将在此显示</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 复制按钮 */}
      <div className="absolute top-0 right-0 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1.5 text-[#4ef2c2]" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              复制
            </>
          )}
        </Button>
      </div>

      {/* Markdown 内容 */}
      <div className="prose prose-sm max-w-none pt-10 dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-foreground mb-4 mt-6 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-foreground mb-3 mt-5">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-medium text-foreground mb-2 mt-4">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-foreground/80 leading-relaxed mb-3">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-foreground/80 space-y-1 mb-3">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-foreground/80 space-y-1 mb-3">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-foreground/80">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-[#4ef2c2]/50 pl-4 text-muted-foreground italic my-4">
                {children}
              </blockquote>
            ),
            code: ({ className, children }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-[#4ef2c2] text-sm">
                    {children}
                  </code>
                );
              }
              return (
                <code className="block bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  {children}
                </code>
              );
            },
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
            hr: () => <hr className="border-border my-6" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
