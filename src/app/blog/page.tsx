import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockPosts = [
  {
    title: "欢迎来到我的博客",
    description: "这里记录了我的思考、构建、设计过程……",
    date: "2025-05-08",
    tags: ["随笔", "生活"],
    slug: "welcome",
  },
  {
    title: "Agent OS：我正在构建的个人操作系统",
    description: "关于我为什么要做 Agent OS，它未来要成为什么。",
    date: "2025-05-07",
    tags: ["技术", "AI"],
    slug: "agent-os-intro",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">博客</h1>
      <p className="text-gray-600">记录思考、实验与人生的轨迹。</p>

      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <Card className="cursor-pointer hover:shadow-md transition border mb-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">{post.description}</p>

                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
