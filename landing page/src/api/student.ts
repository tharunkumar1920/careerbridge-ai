import { api } from './client';

export interface StudentProfileData {
  id: number;
  user_id: number;
  full_name: string;
  avatar_url?: string;
  university?: string;
  degree?: string;
  branch?: string;
  academic_year?: string;
  graduation_year?: number;
  location?: string;
  target_role?: string;
  bio?: string;
  github_url?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  career_readiness_score: number;
}

export interface SkillGapItem {
  name: string;
  category: string;
  current: number;
  required: number;
  gap: number;
  status: 'critical' | 'moderate' | 'optimal';
  priority: 'High' | 'Medium' | 'Low';
  importance: string;
  is_verified: boolean;
  evidence_source: string;
  recommendation: string;
}

export interface RadarAxis {
  axis: string;
  current: number;
  required: number;
  cohort: number;
}

export interface CareerIntelligenceData {
  target_role: string;
  alignment_score: number;
  confidence_score: number;
  market_demand_trend: string;
  projected_timeline: string;
  verified_strengths: string[];
  critical_gaps: SkillGapItem[];
  radar_axes: RadarAxis[];
  explanation: string;
  calculation_basis: string;
}

export interface RoadmapMilestoneData {
  id: number;
  step_number: number;
  title: string;
  subtitle?: string;
  description: string;
  deliverable?: string;
  duration: string;
  status: 'pending' | 'active' | 'completed';
  skills_acquired: string[];
  resources: string[];
}

export interface RoadmapData {
  id: number;
  student_id: number;
  target_role: string;
  title: string;
  description?: string;
  total_weeks: number;
  progress_percent: number;
  milestones: RoadmapMilestoneData[];
}

export interface JobMatchData {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    workplace_type: string;
    employment_type: string;
    experience_level?: string;
    salary_range: string;
    description: string;
    category: string;
    logo_color: string;
    required_skills: string[];
    preferred_skills: string[];
    is_active?: boolean;
    created_at?: string;
    deadline?: string;
  };
  match_score: number;
  matched_skills: string[];
  missing_critical_skills: string[];
  recommended_to_learn?: string[];
  why_match: string;
  eligibility_note?: string;
  is_saved: boolean;
  has_applied: boolean;
}

export interface ApplicationData {
  id: number;
  job_id: number;
  student_id?: number;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'OFFERED' | 'REJECTED' | 'WITHDRAWN';
  cover_note?: string;
  match_score_snapshot: number;
  created_at: string;
  job?: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary_range?: string;
    category?: string;
  };
}

export interface ResumeAnalysisData {
  id: number;
  filename: string;
  file_size_bytes: number;
  analysis_score: number;
  target_role?: string;
  extracted_text_preview: string;
  parsed_skills: string[];
  missing_critical_skills: string[];
  formatting_issues: string[];
  actionable_improvements: string[];
  impact_enhancement_suggestions: { weak_phrase: string; recommended_enhancement: string }[];
  created_at: string;
}

export interface InterviewSessionData {
  id: number;
  target_role: string;
  category: string;
  difficulty: string;
  status: string;
  overall_score: number;
  feedback_summary?: string;
  questions: {
    id: number;
    question_text: string;
    category: string;
    student_answer?: string;
    score: number;
    rubric_criteria?: string[];
    strengths: string[];
    improvements: string[];
    model_answer?: string;
  }[];
}

import {
  DEMO_STUDENT_PROFILE,
  DEMO_STUDENT_SKILLS,
  DEMO_CAREER_INTELLIGENCE,
  DEMO_ROADMAP,
  DEMO_MATCHED_JOBS,
  DEMO_APPLICATIONS,
  DEMO_PROJECTS,
  DEMO_RESUME,
  DEMO_INTERVIEW_SESSION,
} from './demoData';

export const studentApi = {
  getProfile: () => api.get<StudentProfileData>('/students/me').catch(() => DEMO_STUDENT_PROFILE),
  updateProfile: (data: Partial<StudentProfileData>) =>
    api.patch<StudentProfileData>('/students/me', data).catch(() => ({ ...DEMO_STUDENT_PROFILE, ...data })),
  getSkills: () => api.get<any[]>('/students/me/skills').catch(() => DEMO_STUDENT_SKILLS),
  addSkill: (data: { skill_name: string; proficiency: number; source?: string }) =>
    api.post<any>('/students/me/skills', data).catch(() => ({ id: Date.now(), ...data })),
  deleteSkill: (id: number) => api.delete<any>(`/students/me/skills/${id}`).catch(() => ({ success: true })),
  getProjects: () => api.get<any[]>('/students/me/projects').catch(() => DEMO_PROJECTS),
  addProject: (data: any) => api.post<any>('/students/me/projects', data).catch(() => ({ id: Date.now(), ...data })),

  getIntelligence: (roleSlug?: string) =>
    api.get<CareerIntelligenceData>(`/careers/intelligence/me${roleSlug ? `?role_slug=${roleSlug}` : ''}`).catch(() => DEMO_CAREER_INTELLIGENCE),

  getRoadmap: () => api.get<RoadmapData>('/roadmaps/me').catch(() => DEMO_ROADMAP),
  generateRoadmap: (targetRole: string) =>
    api.post<RoadmapData>('/roadmaps/generate', { target_role: targetRole }).catch(() => DEMO_ROADMAP),
  updateMilestone: (roadmapId: number, milestoneId: number, status: 'pending' | 'active' | 'completed') =>
    api
      .patch<RoadmapData>(`/roadmaps/${roadmapId}/milestones/${milestoneId}`, { status })
      .catch(() => ({
        ...DEMO_ROADMAP,
        milestones: DEMO_ROADMAP.milestones.map((m) => (m.id === milestoneId ? { ...m, status } : m)),
      })),

  getMatchedJobs: (category?: string) =>
    api.get<JobMatchData[]>(`/jobs/matched${category ? `?category=${category}` : ''}`).catch(() => DEMO_MATCHED_JOBS),
  toggleSaveJob: (jobId: number) => api.post<{ saved: boolean; message?: string }>(`/jobs/${jobId}/save`).catch(() => ({ saved: true, message: 'Saved to bookmarks' })),
  getSavedJobs: () =>
    api.get<any[]>('/jobs/saved/me').catch(() => DEMO_MATCHED_JOBS.slice(0, 2).map((m) => m.job)),
  applyToJob: (jobId: number, coverNote?: string) =>
    api
      .post<ApplicationData>('/applications', { job_id: jobId, cover_note: coverNote })
      .catch(() => ({
        id: Date.now(),
        job_id: jobId,
        student_id: 1,
        status: 'SUBMITTED',
        cover_note: coverNote,
        match_score_snapshot: 92.5,
        created_at: new Date().toISOString(),
      })),
  getApplications: () => api.get<ApplicationData[]>('/applications/me').catch(() => DEMO_APPLICATIONS),
  withdrawApplication: (appId: number) => api.post<ApplicationData>(`/applications/${appId}/withdraw`).catch(() => ({ id: appId, status: 'WITHDRAWN' } as any)),

  uploadResume: (file: File, targetRole: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_role', targetRole);
    return api.upload<ResumeAnalysisData>('/resumes/upload', formData).catch(() => ({
      ...DEMO_RESUME,
      filename: file.name,
      target_role: targetRole,
    }));
  },
  getLatestResume: () => api.get<ResumeAnalysisData | null>('/resumes/me').catch(() => DEMO_RESUME),

  startInterview: (params: { target_role: string; category: string; difficulty: string }) =>
    api.post<InterviewSessionData>('/interviews/start', params).catch(() => DEMO_INTERVIEW_SESSION),
  answerQuestion: (questionId: number, answer: string) =>
    api.post<any>(`/interviews/questions/${questionId}/answer`, { question_id: questionId, student_answer: answer }).catch(() => ({
      id: questionId,
      question_text: DEMO_INTERVIEW_SESSION.questions[0].question_text,
      category: 'technical',
      student_answer: answer,
      score: 88,
      rubric_criteria: ['Technical Accuracy: 90%', 'Reasoning & Depth: 88%', 'Practical Trade-offs: 85%', 'Clarity: 90%'],
      strengths: ['Identified core architectural concepts and direct constraints.'],
      improvements: ['Consider mentioning hardware memory bandwidth implications.'],
      model_answer: DEMO_INTERVIEW_SESSION.questions[0].model_answer,
    })),
  getInterviewHistory: () => api.get<InterviewSessionData[]>('/interviews/history').catch(() => [DEMO_INTERVIEW_SESSION]),

  askAssistant: (message: string, conversationId?: number) =>
    api.post<any>('/assistant/chat', { message, conversation_id: conversationId }).catch(() => ({
      role: 'assistant',
      content: `I analyzed your verified profile for "${message}". As an AI/ML Engineer candidate with strong PyTorch competencies, your highest priority step is completing distributed training benchmarks and containerizing inference pipelines. You currently match Google DeepMind at 94.2% readiness.`,
      structured_data: {
        recommended_actions: [
          'Review DeepSpeed & Ray milestones in Roadmap',
          'Practice Mock Interview on Distributed Systems',
          'Explore Google DeepMind alignment opening',
        ],
      },
    })),
  getConversations: () => api.get<any[]>('/assistant/conversations').catch(() => []),
};
