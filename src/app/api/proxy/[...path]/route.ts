import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_JAVA_URL;
const DEBUG_PROXY = process.env.DEBUG_PROXY === "true";

if (!BACKEND_URL) {
  throw new Error("未配置 BACKEND_JAVA_URL，请在 .env 文件中设置。");
}

export async function handler(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const backendPath = pathname.replace(/^\/api\/proxy/, "");
  const targetUrl = BACKEND_URL + backendPath + search;

  const fetchOptions: RequestInit = {
    method: req.method,
    headers: {
      "Content-Type": req.headers.get("Content-Type") || "application/json",
    },
  };

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    fetchOptions.body = await req.text();
  }

  if (DEBUG_PROXY) {
    console.log(`[Proxy] ${req.method} ${targetUrl}`);
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

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
