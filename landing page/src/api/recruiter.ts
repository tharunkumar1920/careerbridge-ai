import { api } from './client';
import {
  DEMO_RECRUITER_PROFILE,
  DEMO_CANDIDATES,
  DEMO_RECRUITER_JOBS,
  DEMO_RECRUITER_APPLICATIONS,
} from './demoData';

export interface RecruiterProfileData {
  id: number;
  user_id: number;
  full_name: string;
  company_name: string;
  company_website?: string;
  company_logo?: string;
  company_size?: string;
  industry?: string;
  is_verified: boolean;
}

export interface CandidateData {
  id: number;
  full_name: string;
  university: string;
  degree: string;
  target_role: string;
  career_readiness_score: number;
  skills: string[];
  projects_count: number;
  location: string;
  bio: string;
}

let localJobs = [...DEMO_RECRUITER_JOBS];
let localApps = [...DEMO_RECRUITER_APPLICATIONS];

export const recruiterApi = {
  getProfile: () =>
    api.get<RecruiterProfileData>('/recruiter/me').catch(() => DEMO_RECRUITER_PROFILE),

  updateProfile: (data: Partial<RecruiterProfileData>) =>
    api
      .patch<RecruiterProfileData>('/recruiter/me', data)
      .catch(() => ({ ...DEMO_RECRUITER_PROFILE, ...data })),

  getJobs: () =>
    api.get<any[]>('/recruiter/jobs').catch(() => localJobs),

  createJob: (data: any) =>
    api
      .post<any>('/recruiter/jobs', data)
      .catch(() => {
        const newJob = {
          id: Date.now(),
          ...data,
          applicant_count: 0,
          is_active: true,
          created_at: new Date().toISOString(),
        };
        localJobs = [newJob, ...localJobs];
        return newJob;
      }),

  updateJob: (jobId: number, data: any) =>
    api
      .patch<any>(`/recruiter/jobs/${jobId}`, data)
      .catch(() => {
        localJobs = localJobs.map((j) => (j.id === jobId ? { ...j, ...data } : j));
        return { success: true };
      }),

  getJobApplications: (jobId: number) =>
    api
      .get<any[]>(`/recruiter/jobs/${jobId}/applications`)
      .catch(() => localApps.filter((a) => a.job_id === jobId || jobId === 1)),

  updateApplicationStatus: (appId: number, status: string) =>
    api
      .patch<any>(`/recruiter/applications/${appId}/status`, { status })
      .catch(() => {
        localApps = localApps.map((a) => (a.id === appId ? { ...a, status } : a));
        return { success: true, status };
      }),

  searchCandidates: (params?: { skill?: string; role?: string }) => {
    const q = new URLSearchParams(params as any).toString();
    return api
      .get<CandidateData[]>(`/recruiter/candidates${q ? `?${q}` : ''}`)
      .catch(() => {
        if (!params?.skill) return DEMO_CANDIDATES;
        const skillLower = params.skill.toLowerCase();
        return DEMO_CANDIDATES.filter((c) =>
          c.skills.some((s) => s.toLowerCase().includes(skillLower))
        );
      });
  },
};

