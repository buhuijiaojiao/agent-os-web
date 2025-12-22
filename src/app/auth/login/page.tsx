"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { httpPost } from "@/lib/http";

interface LoginDto {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string | null;
    isError: boolean;
  }>({ text: null, isError: false });


  const showMessage = (text: string | null, isError: boolean) => {
    setMessage({ text, isError });
  };

  const doLogin = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!email || !password) {
        showMessage("邮箱和密码不能为空。", true);
        return;
      }

      setIsLoading(true);
      showMessage(null, false);

      try {
        const token = await httpPost<string>("/api/proxy/user/doLogin", {
          email,
          password,
        });

        // 保存登录态
        localStorage.setItem("authToken", token);

        showMessage("登录成功，正在进入系统...", false);

        // replace：避免回退到登录页
        setTimeout(() => {
          router.replace("/main");
        }, 500);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "登录失败，请稍后重试。";
        showMessage(errorMessage, true);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, router]
  );

  const messageClass = message.text
    ? message.isError
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700"
    : "hidden";

  const buttonText = isLoading ? "登录中..." : "登录";

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gray-100 p-4"
      style={{
        background: "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)",
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">欢迎回来</h1>
          <p className="mt-2 text-sm text-gray-500">请登录您的账户</p>
        </div>

        <form className="space-y-6" onSubmit={doLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              邮箱地址
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              密码长度需在 6 到 12 位之间。
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold disabled:bg-indigo-400"
          >
            {buttonText}
          </button>

          <div className={`text-center p-3 rounded-lg ${messageClass}`}>
            {message.text}
          </div>
        </form>
      </div>
    </div>
  );
}
