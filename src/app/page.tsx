"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    /**
     * 已登录用户直接进入主页面，未登录用户进入登录页
     */
    if (token) {
      router.replace("/main");
    } else {
      router.replace("/auth/login");
    }
  }, [router]);

  // 根页面不渲染任何内容，避免闪屏
  return null;
}
