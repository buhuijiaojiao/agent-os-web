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
async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // 第一层：HTTP 层错误（服务器挂了、404、跨域等）
  if (!res.ok) {
    throw new Error(`HTTP错误: ${res.status}`);
  }

  // 第二层：解析业务层响应 Result<T>
  const result: Result<T> = await res.json();

  // 业务不成功（你的 Result 里的 ok 判断）
  if (result.code !== "00000") {
    throw new Error(result.message || "业务处理失败");
  }

  // 返回真正的数据
  return result.data;
}

/**
 * GET 请求
 */
export const httpGet = <T>(url: string) =>
  request<T>(url, { method: "GET" });

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
