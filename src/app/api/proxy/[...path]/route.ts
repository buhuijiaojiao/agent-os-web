import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:8090";

export async function handler(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 去掉 /api/proxy 前缀，获取真实后端路径
  const backendPath = pathname.replace(/^\/api\/proxy/, "");

  // 构造目标 URL
  const targetUrl = BACKEND_URL + backendPath + search;
  // 构造 fetch 配置
  const fetchOptions: RequestInit = {
    method: req.method,
    headers: {
      "Content-Type": req.headers.get("Content-Type") || "application/json",
    },
  };

  // 支持 POST/PUT/PATCH body
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    fetchOptions.body = await req.text();
  }

  try {
    const res = await fetch(targetUrl, fetchOptions);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      {
        code: "500",
        message: "代理请求失败: " + e.message,
        data: null,
      },
      { status: 500 }
    );
  }
}

// Next.js 要求导出方法名对应 HTTP 方法
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
