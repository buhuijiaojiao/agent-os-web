// app/main/layout.tsx
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /*
      🚀 主布局采用 flex + h-screen + overflow-hidden
      - h-screen：占满 RootLayout 的 body
      - overflow-hidden：禁止浏览器整体滚动
      - flex：Sidebar + 主内容区
    */
    <div className="flex h-screen overflow-hidden">
      {/* 左侧 Sidebar */}
      <AppSidebar />

      {/* 右侧内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopBar />

        <main className="flex-1 overflow-hidden px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
