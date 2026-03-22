import { httpPost } from '@/lib/http';

export const authService = {
  login: (email: string, password: string) =>
    httpPost<string>('/api/proxy/auth/login', { email, password }),
};
