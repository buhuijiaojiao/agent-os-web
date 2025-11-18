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
  options: RequestInit = {},
  timeout = 8000 // 默认 8 秒
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`HTTP错误: ${res.status}`);
    }

    const result: Result<T> = await res.json();

    if (result.code !== "2000") {
      throw new Error(result.message || "业务处理失败");
    }

    return result.data;

  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("请求超时，请稍后再试");
    }
    throw err;

  } finally {
    clearTimeout(id);
  }
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
