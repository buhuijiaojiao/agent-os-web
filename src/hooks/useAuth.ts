'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { authService } from '@/services/auth.service';

export function useAuth() {
  const router = useRouter();
  const { token, setToken, clearToken } = useAuthStore();

  const login = async (email: string, password: string) => {
    const newToken = await authService.login(email, password);
    setToken(newToken);
    router.replace('/main');
  };

  const logout = () => {
    clearToken();
    router.replace('/auth/login');
  };

  return {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
}
