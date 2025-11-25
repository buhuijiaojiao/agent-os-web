// app/layout.tsx
import "./globals.css";
import localFont from "next/font/local";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";

const jetBrainsMono = localFont({
  // 路径是相对于 app/layout.tsx 的相对路径
  src: "../fonts/JetBrains_Mono/static/JetBrainsMono-Regular.ttf",

  // 明确指定该字体文件的权重和样式，以确保浏览器正确映射
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Agent OS Web",
  description: "Personal Operating System for PoulCore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
        🚀主布局采用 flex + h-screen + overflow-hidden
        - h-screen：锁定全局高度
        - overflow-hidden：禁止浏览器整体滚动
        - flex：两栏主结构：Sidebar + Main
      */}
      <body
        className={`${jetBrainsMono.className} flex h-screen overflow-hidden bg-background`}
      >
        {/* 左侧固定 Sidebar（非 fixed，不遮挡内容） */}
        <AppSidebar />

        {/* 右侧区域：顶部固定 + 主内容可控滚动 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppTopBar />

          {/* 
            flex-1 overflow-hidden：
            - 限制主内容区不会撑开页面
            - 子路由（如 ChatLayout）可以自由使用 flex-1 + min-h-0 进行滚动控制
          */}
          <main className="flex-1 overflow-hidden px-6 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
