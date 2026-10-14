import { api } from './client';

export const publicApi = {
  getJobs: (params?: { category?: string; workplace?: string; keyword?: string }) => {
    const q = new URLSearchParams(params as any).toString();
    return api.get<any[]>(`/jobs${q ? `?${q}` : ''}`);
  },
  getRoles: () => api.get<any[]>('/careers'),
  getRoleBySlug: (slug: string) => api.get<any>(`/careers/${slug}`),
  getResources: (params?: { topic?: string; skill?: string; difficulty?: string }) => {
    const q = new URLSearchParams(params as any).toString();
    return api.get<any[]>(`/resources${q ? `?${q}` : ''}`);
  },
  getMarketAnalytics: () => api.get<any>('/analytics/overview'),
};

export const getPublicJobs = (params?: { category?: string; workplace?: string; keyword?: string }) =>
  publicApi.getJobs(params);
