"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function RootPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    /**
     * 已登录用户直接进入主页面，未登录用户进入登录页
     */
    if (token) {
      router.replace("/main");
    } else {
      router.replace("/auth/login");
    }
  }, [router, token]);

  // 根页面不渲染任何内容，避免闪屏
  return null;
}
