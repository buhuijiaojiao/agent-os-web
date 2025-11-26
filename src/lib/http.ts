/**
 * 后端统一返回结构
 * 对应 Java 的 Result<T>
 */
export interface Result<T> {
  code: string;
  message: string;
  data: T;
}

/**
 * HTTP 基础请求方法
 */
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("authToken");

  // 基础 headers 包含 Content-Type
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // 携带 Token 添加到 Authorization 头部
  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // 标准格式：Bearer + Token
  }

  const res = await fetch(url, {
    cache: "no-store",
    headers, // 使用最终 Headers
    ...options,
  });

  // HTTP 层
  if (!res.ok) {
    throw new Error(`HTTP错误: ${res.status}`);
  }

  // 业务层
  const result: Result<T> = await res.json();

  if (result.code !== "2000") {
    throw new Error(result.message || "业务处理失败");
  }

  return result.data;
}

/**
 * GET 请求
 */
export const httpGet = <T>(url: string) => request<T>(url, { method: "GET" });

/**
 * POST 请求
 */
export const httpPost = <T>(url: string, body?: any) =>
  request<T>(url, {
    method: "POST",
    body: JSON.stringify(body || {}),
  });

/**
 * PUT 请求
 */
export const httpPut = <T>(url: string, body?: any) =>
  request<T>(url, {
    method: "PUT",
    body: JSON.stringify(body || {}),
  });

/**
 * PATCH 请求
 */
export const httpPatch = <T>(url: string, body?: any) =>
  request<T>(url, {
    method: "PATCH",
    body: JSON.stringify(body || {}),
  });

/**
 * DELETE 请求
 */
export const httpDelete = <T>(url: string) =>
  request<T>(url, { method: "DELETE" });
