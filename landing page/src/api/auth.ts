import { api } from './client';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: 'STUDENT' | 'RECRUITER' | 'ADMIN';
  user_id: number;
  email: string;
  name: string;
}

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),

  register: (data: {
    email: string;
    password: string;
    role: 'STUDENT' | 'RECRUITER';
    name: string;
    university_or_company?: string;
    target_role_or_industry?: string;
  }) => api.post<AuthResponse>('/auth/register', data),

  logout: () => api.post<{ message: string }>('/auth/logout'),

  getMe: () => api.get<{ id: number; email: string; role: string; is_active: boolean }>('/auth/me'),

  forgotPassword: (email: string) => api.post<{ message: string }>('/auth/forgot-password', { email }),

  resetPassword: (token: string, new_password: string) =>
    api.post<{ message: string }>('/auth/reset-password', { token, new_password }),
};

export const forgotPassword = (email: string) => authApi.forgotPassword(email);
export const resetPassword = (token: string, new_pass: string) => authApi.resetPassword(token, new_pass);
