import { Badge } from "@/components/ui/badge";

export default function BlogDetailPage() {
  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      {/* 标题 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">欢迎来到我的博客</h1>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <span>2025-05-08</span>
          <Badge variant="secondary">随笔</Badge>
          <Badge variant="secondary">生活</Badge>
        </div>
      </div>

      {/* 正文 */}
      <article className="prose prose-neutral max-w-none">
        <p>
          这是一个示例博客页面，用来展示博客正文的排版效果。
          你之后可以把这里替换为 Markdown 渲染。
        </p>

        <h2>小标题示例</h2>
        <p>
          这里是正文段落……文字会自动换行、适配段落格式。
        </p>

        <ul>
          <li>支持列表</li>
          <li>支持标题</li>
          <li>支持基础排版</li>
        </ul>

        <p>未来支持技术文档、设计记录、产品构思等等。</p>
      </article>
    </div>
  );
}
