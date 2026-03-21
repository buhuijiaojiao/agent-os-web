"use client";

import React, { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();

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
        await login(email, password);
        showMessage("登录成功，正在进入系统...", false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "登录失败，请稍后重试。";
        showMessage(errorMessage, true);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, login],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-white">
      {/* 🌌 强制背景（关键：不受 layout 影响） */}
      <div className="absolute inset-0 bg-[#0b0c10]" />

      {/* gradient atmosphere */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_20%_20%,rgba(78,242,194,0.08),transparent_40%),
              radial-gradient(circle_at_80%_0%,rgba(78,242,194,0.05),transparent_50%)]
        "
      />

      {/* grid */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-[0.04]
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),
                           linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* 🧠 登录面板 */}
      <div
        className="
          relative w-full max-w-md p-8 space-y-6
          rounded-2xl
          bg-[#111217]/80 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_60px_rgba(0,0,0,0.6)]
        "
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#4ef2c2] animate-pulse" />
            <span className="text-xs text-white/40 tracking-widest uppercase">
              Agent OS
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Access System
          </h1>

          <p className="text-sm text-white/40">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={doLogin} className="space-y-5">
          <InputField
            label="Email"
            value={email}
            disabled={isLoading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            disabled={isLoading}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full py-2.5 rounded-lg
              bg-[#4ef2c2]/20 text-[#4ef2c2]
              hover:bg-[#4ef2c2]/30
              transition
              disabled:opacity-50
            "
          >
            {isLoading ? "Entering..." : "Enter System"}
          </button>

          {message.text && (
            <div
              className={`
                text-sm px-3 py-2 rounded-md
                ${
                  message.isError
                    ? "bg-red-500/10 text-red-400"
                    : "bg-[#4ef2c2]/10 text-[#4ef2c2]"
                }
              `}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
function InputField({
  label,
  type = "text",
  value,
  onChange,
  disabled
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-white/40">{label}</label>

      <div
        className="
          relative rounded-lg border border-white/10
          bg-white/[0.03]
          focus-within:border-[#4ef2c2]/50
          transition
        "
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0
                        focus-within:opacity-100 transition
                        bg-[radial-gradient(circle,rgba(78,242,194,0.15),transparent_70%)]"
        />

        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className="
            relative z-10 w-full px-4 py-2.5
            bg-transparent outline-none
            text-sm text-white
            placeholder:text-white/30
          "
        />
      </div>
    </div>
  );
}
