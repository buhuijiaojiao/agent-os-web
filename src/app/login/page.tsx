"use client";
import React, { useState } from "react";
// 移除了 useCallback，简化逻辑

// ----------------------------------------------------
// TypeScript React Component - 极简核心功能
// ----------------------------------------------------

export default function LoginPage() {
  // 状态管理：只保留输入值
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * 登录处理函数 - 仅捕获输入值
   */
  const doLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // 核心功能：打印输入值，后续在此处添加认证逻辑
    console.log("--- 登录尝试（核心功能）---");
    console.log("邮箱:", email);
    console.log("密码:", password);

    // TODO: 在这里集成您的后端认证 API 调用 (如： fetch('/api/login', ...))
    // 成功后，保存Token 进行页面跳转
  };

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
            />
          </div>

          {/* 登录按钮 */}
          <div>
            <button
              type="submit"
              // 移除了 disabled 状态
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform active:scale-95"
            >
              登录
            </button>
          </div>

          {/* 移除了消息显示区域 */}
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
