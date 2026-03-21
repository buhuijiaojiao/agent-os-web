import { useAuthStore } from '@/store/auth';

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
  // 从 Zustand store 获取 token
  const token = useAuthStore.getState().token;

  // 基础 headers 包含 Content-Type
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // 携带 Token 添加到 Authorization 头部
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    cache: 'no-store',
    headers,
    ...options,
  });

  // HTTP 层
  if (!res.ok) {
    throw new Error(`HTTP错误: ${res.status}`);
  }

  // 业务层
  const result: Result<T> = await res.json();

  // ⭐ 统一处理 token 失效
  if (result.code === '4001') {
    useAuthStore.getState().clearToken();
    // 跳转登录页
    window.location.href = '/auth/login';
    // 中断 Promise 链
    return Promise.reject(new Error(result.message || '登录状态已失效，请重新登录。'));
  }

  if (result.code !== '2000') {
    throw new Error(result.message || '业务处理失败');
  }

  return result.data;
}

/**
 * GET 请求
 */
export const httpGet = <T>(url: string) => request<T>(url, { method: 'GET' });

/**
 * POST 请求
 */
export const httpPost = <T>(url: string, body?: unknown) =>
  request<T>(url, {
    method: 'POST',
    body: JSON.stringify(body || {}),
  });

/**
 * PUT 请求
 */
export const httpPut = <T>(url: string, body?: unknown) =>
  request<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body || {}),
  });

/**
 * PATCH 请求
 */
export const httpPatch = <T>(url: string, body?: unknown) =>
  request<T>(url, {
    method: 'PATCH',
    body: JSON.stringify(body || {}),
  });

/**
 * DELETE 请求
 */
export const httpDelete = <T>(url: string) =>
  request<T>(url, { method: 'DELETE' });
