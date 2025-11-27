"use client";
import React, { useState, useCallback } from "react";
// 引入 Next.js Router (假设可用，用于页面跳转)
// import { useRouter } from 'next/navigation';

// ----------------------------------------------------
// 引入封装的 HTTP 请求方法
// ----------------------------------------------------
import { httpPost } from "@/lib/http"; // 假设路径为 @/lib/http

// ----------------------------------------------------
// 前端数据模型定义 (与后端 DTO 保持一致)
// ----------------------------------------------------
interface LoginDto {
  email: string;
  password: string;
}

// 假设后端成功响应结构中，data 字段的内容 (Token)
interface LoginVo {
  token: string;
  // 可以包含其他用户信息
}

// ----------------------------------------------------
// TypeScript React Component - 补全登录逻辑
// ----------------------------------------------------

export default function LoginPage() {
  // 状态管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string | null;
    isError: boolean;
  }>({ text: null, isError: false });

  /**
   * 显示消息框
   */
  const showMessage = (text: string, isError: boolean) => {
    setMessage({ text, isError });
  };

  /**
   * 登录处理函数
   */
  const doLogin = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!email || !password) {
        showMessage("邮箱和密码不能为空。", true);
        return;
      }

      setIsLoading(true);
      showMessage(null, false); // 清除旧消息

      const loginPayload: LoginDto = { email, password };

      try {
        // 1. 使用封装后的 httpPost 发送登录请求
        // 捕获的任何 Error.message 都会是后端返回的业务错误信息，或者 HTTP 错误信息。
        const token = await httpPost<LoginVo>(
          "/api/proxy/user/doLogin",
          loginPayload
        );

        //保存 Token 到本地存储
        localStorage.setItem("authToken", token);

        showMessage("登录成功，正在跳转...", false);
        console.log("登录成功，Token:", token);

        // 实际应用中：跳转到主页或聊天页面这里先不写

      } catch (error) {
        // 2. 捕获由 httpPost 或代理层 抛出的错误
        const errorMessage =
          error instanceof Error ? error.message : "未知错误，请稍后重试。";
        showMessage(errorMessage, true);
        console.error("Login Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password]
  );

  // 动态 Tailwind CSS 类用于消息框
  const messageClass = message.text
    ? message.isError
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700"
    : "hidden";

  const buttonText = isLoading ? "登录中..." : "登录";

  return (
    // 使用 min-h-screen 和 flex 居中容器
    <div
      className="min-h-screen flex justify-center items-center bg-gray-100 p-4"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-xl transition-all duration-300 transform hover:shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">欢迎回来</h1>
          <p className="mt-2 text-sm text-gray-500">请登录您的账户</p>
        </div>

        <form className="space-y-6" onSubmit={doLogin}>
          {/* 电子邮件/用户名输入框 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              邮箱地址
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="请输入您的邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-base"
              disabled={isLoading}
            />
          </div>

          {/* 密码输入框 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="请输入您的密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-base"
              disabled={isLoading}
            />
            {/* 提示密码长度限制，与后端 LoginDto 校验保持一致 */}
            <p className="mt-1 text-xs text-gray-500">
              密码长度需在 6 到 12 位之间。
            </p>
          </div>

          {/* 登录按钮 */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform active:scale-95 disabled:bg-indigo-400"
            >
              {buttonText}
            </button>
          </div>

          {/* 消息显示区域 */}
          <div
            className={`text-center p-3 rounded-lg ${messageClass}`}
            role="alert"
          >
            {message.text}
          </div>
        </form>

        <div className="text-center text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            忘记密码?
          </a>
        </div>
      </div>
    </div>
  );
}
