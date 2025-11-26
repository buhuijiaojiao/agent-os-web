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
      "Authorization": req.headers.get("Authorization") || "",
    },
  };

  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    fetchOptions.body = await req.text();
  }

  try {
    const res = await fetch(targetUrl, fetchOptions);
    const data = await res.json();
    //代码执行到此处说明代理请求成功
    if (DEBUG_PROXY) {
      console.log(`[DEBUG:Proxy success] ${req.method} ${targetUrl}`);
    }
    return NextResponse.json(data);
  } catch (e: unknown) {
    //代码执行到此处说明代理请求失败
    if (e instanceof Error ) {
      if (DEBUG_PROXY) {
        console.log(
          `[DEBUG:Proxy error] ${req.method} ${targetUrl} - ${e.message}`
        );
      }
       return NextResponse.json({
         message: "代理请求失败:" + e.message
       });
    } else {
      if (DEBUG_PROXY) {
        console.log(`[DEBUG:Proxy error] ${req.method} ${targetUrl} - 未知错误`);
      }
      return NextResponse.json({
        message: "代理未知错误"
      });
    }
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
