import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { StudentLayout } from './layouts/StudentLayout';
import { RecruiterLayout } from './layouts/RecruiterLayout';

// Landing Page (Preserved 3D Experience)
import { LandingPage } from './pages/LandingPage';

// Public Pages
import { AboutPage } from './pages/public/AboutPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { PublicOpportunitiesPage } from './pages/public/PublicOpportunitiesPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/public/ResetPasswordPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { TermsPage } from './pages/public/TermsPage';

// Student Pages
import { DashboardPage as StudentDashboard } from './pages/student/DashboardPage';
import { ProfilePage as StudentProfile } from './pages/student/ProfilePage';
import { SkillsPage as StudentSkills } from './pages/student/SkillsPage';
import { CareerGuidancePage as StudentGuidance } from './pages/student/CareerGuidancePage';
import { SkillGapPage as StudentSkillGap } from './pages/student/SkillGapPage';
import { RoadmapPage as StudentRoadmap } from './pages/student/RoadmapPage';
import { LearningPage as StudentLearning } from './pages/student/LearningPage';
import { ProjectsPage as StudentProjects } from './pages/student/ProjectsPage';
import { ResumePage as StudentResume } from './pages/student/ResumePage';
import { InterviewPage as StudentInterview } from './pages/student/InterviewPage';
import { OpportunitiesPage as StudentOpportunities } from './pages/student/OpportunitiesPage';
import { ApplicationsPage as StudentApplications } from './pages/student/ApplicationsPage';
import { SavedJobsPage as StudentSavedJobs } from './pages/student/SavedJobsPage';
import { AssistantPage as StudentAssistant } from './pages/student/AssistantPage';
import { NotificationsPage as StudentNotifications } from './pages/student/NotificationsPage';
import { SettingsPage as StudentSettings } from './pages/student/SettingsPage';

// Recruiter Pages
import { RecruiterDashboardPage } from './pages/recruiter/RecruiterDashboardPage';
import { CompanyPage } from './pages/recruiter/CompanyPage';
import { RecruiterJobsPage } from './pages/recruiter/RecruiterJobsPage';
import { PostJobPage } from './pages/recruiter/PostJobPage';
import { RecruiterApplicationsPage } from './pages/recruiter/RecruiterApplicationsPage';
import { CandidatesPage } from './pages/recruiter/CandidatesPage';
import { AnalyticsPage } from './pages/recruiter/AnalyticsPage';
import { RecruiterSettingsPage } from './pages/recruiter/RecruiterSettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* The Master Landing Page (Preserving 3D Journey Canvas & Design) */}
            <Route path="/" element={<LandingPage />} />

            {/* Public Informational & Authentication Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/opportunities" element={<PublicOpportunitiesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Route>

            {/* Student Protected Route Tree */}
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<Navigate to="/student/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="skills" element={<StudentSkills />} />
              <Route path="career-guidance" element={<StudentGuidance />} />
              <Route path="skill-gap" element={<StudentSkillGap />} />
              <Route path="roadmap" element={<StudentRoadmap />} />
              <Route path="learning" element={<StudentLearning />} />
              <Route path="projects" element={<StudentProjects />} />
              <Route path="resume" element={<StudentResume />} />
              <Route path="interview" element={<StudentInterview />} />
              <Route path="opportunities" element={<StudentOpportunities />} />
              <Route path="applications" element={<StudentApplications />} />
              <Route path="saved" element={<StudentSavedJobs />} />
              <Route path="assistant" element={<StudentAssistant />} />
              <Route path="notifications" element={<StudentNotifications />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>

            {/* Recruiter Protected Route Tree */}
            <Route path="/recruiter" element={<RecruiterLayout />}>
              <Route index element={<Navigate to="/recruiter/dashboard" replace />} />
              <Route path="dashboard" element={<RecruiterDashboardPage />} />
              <Route path="company" element={<CompanyPage />} />
              <Route path="jobs" element={<RecruiterJobsPage />} />
              <Route path="jobs/new" element={<PostJobPage />} />
              <Route path="jobs/:jobId" element={<RecruiterJobsPage />} />
              <Route path="applications" element={<RecruiterApplicationsPage />} />
              <Route path="candidates" element={<CandidatesPage />} />
              <Route path="candidates/:candidateId" element={<CandidatesPage />} />
              <Route path="talent-search" element={<CandidatesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<RecruiterSettingsPage />} />
            </Route>

            {/* Wildcard Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
