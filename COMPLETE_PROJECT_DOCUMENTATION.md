# CareerBridge AI — Complete Architecture, Design, and UI Specification

> **AI-Powered Career Intelligence, Educational Guidance, and Recruitment Platform**  
> *"Bridge Your Skills. Build Your Tomorrow."*  
> **Course / Project Context**: AI Assisted Coding — Final Capstone Project  
> **Document Version**: 2.0.0 (Production Release)  
> **Last Updated**: October 2026

---

## Table of Contents

1. [Executive Summary & Project Vision](#1-executive-summary--project-vision)
2. [High-Level System Architecture](#2-high-level-system-architecture)
   - 2.1 [System Architecture Diagram](#21-system-architecture-diagram)
   - 2.2 [Tier Decomposition & Data Flow](#22-tier-decomposition--data-flow)
   - 2.3 [Dual-Database Architecture (SQLite & PostgreSQL)](#23-dual-database-architecture-sqlite--postgresql)
3. [Algorithmic & AI Engine Architecture](#3-algorithmic--ai-engine-architecture)
   - 3.1 [Deterministic Skill Gap & Career Intelligence Engine](#31-deterministic-skill-gap--career-intelligence-engine)
   - 3.2 [Transparent Job Matching Engine (70/30 Rule + Project Bonus)](#32-transparent-job-matching-engine-7030-rule--project-bonus)
   - 3.3 [ATS Resume NLP Diagnostic Engine](#33-ats-resume-nlp-diagnostic-engine)
   - 3.4 [Rubric-Grounded AI Mock Interview Simulator](#34-rubric-grounded-ai-mock-interview-simulator)
   - 3.5 [Contextual Career Assistant Engine (Zero-Hallucination)](#35-contextual-career-assistant-engine-zero-hallucination)
4. [Relational Data Models & Database Schema](#4-relational-data-models--database-schema)
   - 4.1 [Entity Relationship Diagram](#41-entity-relationship-diagram)
   - 4.2 [Complete Schema Specifications (15 Relational Tables)](#42-complete-schema-specifications-15-relational-tables)
5. [Backend API Specification (FastAPI v1)](#5-backend-api-specification-fastapi-v1)
   - 5.1 [Core Configuration & Security Framework](#51-core-configuration--security-framework)
   - 5.2 [RESTful Domain Routers & Endpoints](#52-restful-domain-routers--endpoints)
6. [Frontend Architecture & Client State](#6-frontend-architecture--client-state)
   - 6.1 [React 19 + TypeScript + Vite Architecture](#61-react-19--typescript--vite-architecture)
   - 6.2 [Routing Hierarchy & Route Guards](#62-routing-hierarchy--route-guards)
   - 6.3 [Global State Management (AuthContext & ToastContext)](#63-global-state-management-authcontext--toastcontext)
   - 6.4 [Resilient API Layer & Offline Demo Data Fallback](#64-resilient-api-layer--offline-demo-data-fallback)
7. [Visual Design System & UI Architecture](#7-visual-design-system--ui-architecture)
   - 7.1 [Design Philosophy: Cinematic Cybernetic Glassmorphism](#71-design-philosophy-cinematic-cybernetic-glassmorphism)
   - 7.2 [Design Tokens, Colors & CSS Variables](#72-design-tokens-colors--css-variables)
   - 7.3 [Typography Hierarchy & Font Pairing](#73-typography-hierarchy--font-pairing)
   - 7.4 [Glassmorphic Panels & Surface Elevation](#74-glassmorphic-panels--surface-elevation)
   - 7.5 [Sleek Top Navigation Bar Redesign](#75-sleek-top-navigation-bar-redesign)
8. [3D WebGL Journey Canvas (Three.js Engine)](#8-3d-webgl-journey-canvas-threejs-engine)
   - 8.1 [WebGL Pipeline & Continuous Spline Path](#81-webgl-pipeline--continuous-spline-path)
   - 8.2 [Scroll-Synchronized Camera Choreography](#82-scroll-synchronized-camera-choreography)
   - 8.3 [Interactive Visual Objects & Chapter Themes](#83-interactive-visual-objects--chapter-themes)
   - 8.4 [Performance & Accessibility Adaptations](#84-performance--accessibility-adaptations)
9. [Comprehensive Page-by-Page UI/UX Specifications](#9-comprehensive-page-by-page-uiux-specifications)
   - 9.1 [The Master 3D Landing Page (6 Chapters)](#91-the-master-3d-landing-page-6-chapters)
   - 9.2 [Public & Authentication Pages](#92-public--authentication-pages)
   - 9.3 [Student Portal (16 Sub-Pages)](#93-student-portal-16-sub-pages)
   - 9.4 [Recruiter Portal (8 Sub-Pages)](#94-recruiter-portal-8-sub-pages)
10. [Testing, Security & Deployment Guide](#10-testing-security--deployment-guide)
    - 10.1 [Backend Automated Test Suite (Pytest)](#101-backend-automated-test-suite-pytest)
    - 10.2 [Frontend Build Verification](#102-frontend-build-verification)
    - 10.3 [Security Auditing & Privacy Boundaries](#103-security-auditing--privacy-boundaries)
    - 10.4 [Local & Production Deployment Setup](#104-local--production-deployment-setup)

---

## 1. Executive Summary & Project Vision

### 1.1 The Problem Space
In the modern technical recruitment landscape, both students and recruiters face severe systemic disconnects:
- **Students** lack actionable clarity regarding the exact skills demanded by industry roles. Traditional job descriptions are verbose, vague, and uncalibrated, leaving candidates unsure whether their academic preparation qualifies them for entry-level or junior engineering positions.
- **Recruitment Platforms** rely on black-box keyword matching algorithms that penalize qualified candidates due to arbitrary keyword phrasing or provide candidates with zero transparent feedback when an application is rejected.
- **Skill Acquisition** is fragmented. Students study disparate courses without an integrated roadmap that connects self-study directly to verified job openings and interactive mock interview evaluation.

### 1.2 The CareerBridge Solution
**CareerBridge AI** is an enterprise-grade, full-stack career intelligence, educational guidance, and transparent recruitment platform designed to eliminate the ambiguity between student capability and industry demand.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAREERBRIDGE AI ECOSYSTEM                       │
├───────────────────────────────┬────────────────────────────────────────┤
│     STUDENT CAPABILITIES      │         RECRUITER CAPABILITIES         │
├───────────────────────────────┼────────────────────────────────────────┤
│ • Verified & Self-Reported    │ • Company Profile & Brand Showcase     │
│   Skill Competencies          │ • Multi-Criteria Job Posting Engine    │
│ • Deterministic Skill-Gap     │ • Transparent Candidate Pipeline       │
│   Radar Evaluation (6 Axes)   │ • Application Status Transitions       │
│ • Dynamic Milestone Roadmaps  │   (Submitted → Shortlist → Offered)   │
│ • ATS Resume Diagnostics      │ • Skill-Based Talent Search            │
│ • AI Mock Interview Rubrics   │ • Market Skill Demand Intelligence     │
│ • Explainable 70/30 Job Match │ • Privacy-Guarded Direct Outreach      │
└───────────────────────────────┴────────────────────────────────────────┘
```

### 1.3 Key Innovations
1. **Explainable Deterministic Matching**: Unlike opaque scoring models, CareerBridge utilizes a deterministic matching engine that breaks down candidate-job alignment into **70% Required Skills**, **30% Preferred Skills**, and a **+5% Project Evidence Bonus**.
2. **Local Intelligent AI Architecture**: The platform operates with 100% offline intelligence out-of-the-box (zero mandatory external API dependencies) via deterministic mathematical algorithms, heuristic NLP, and curated question rubrics, while maintaining plug-and-play compatibility with Gemini, OpenAI, and Anthropic.
3. **Immersive 3D WebGL Storytelling**: A custom Three.js continuous spline journey canvas seamlessly guides first-time visitors from initial skill exploration down to career triumph with smooth scroll-coupled camera interpolation.
4. **Cinematic Dark Glassmorphism UI**: High-contrast, accessibility-tested visual tokens (`#05070D` background, frosted glass panels with 24px backdrop blur, vibrant lavender/cyan accents) deliver an exceptionally modern desktop experience.

---

## 2. High-Level System Architecture

### 2.1 System Architecture Diagram

```mermaid
graph TB
    subgraph Client Tier [Frontend Layer - React 19 + TypeScript + Vite]
        UI_Landing[Master 3D Landing Page]
        UI_Student[Student Portal - 16 Views]
        UI_Recruiter[Recruiter Portal - 8 Views]
        Canvas3D[Three.js WebGL Journey Canvas]
        Router[React Router DOM v7]
        AuthCtx[Auth Context & JWT Token Storage]
        ToastCtx[Toast Notification Context]
        ApiClient[Typed API Client with Offline Fallback]
    end

    subgraph Gateway Tier [API Gateway & Reverse Proxy]
        ViteProxy[Vite Dev Server Proxy :5173]
        CORS[FastAPI CORS Middleware]
    end

    subgraph Backend Tier [Application Layer - FastAPI & Python 3.13]
        AuthRouter[Auth & RBAC Router]
        StudentRouter[Student Profiles Router]
        CareerRouter[Careers & Gaps Router]
        RoadmapRouter[Dynamic Roadmaps Router]
        JobRouter[Jobs & Matching Router]
        AppRouter[Applications Router]
        RecruiterRouter[Recruiter Pipeline Router]
        ResumeRouter[Resume Diagnostics Router]
        InterviewRouter[Mock Interviews Router]
        AssistantRouter[Grounded Assistant Router]
        AnalyticsRouter[Market Trends Router]

        subgraph Core Services [Business Logic & AI Engines]
            CI_Service[CareerIntelligenceService]
            ME_Engine[JobMatchingEngine]
            RS_Service[ResumeService - PyPDF NLP]
            IS_Service[InterviewService - Rubric Evaluator]
            AS_Service[AssistantService - Grounded KB]
            RM_Service[RoadmapService]
            AN_Service[AnalyticsService]
        end
    end

    subgraph Data Tier [Persistence Layer]
        SQLAlchemy[SQLAlchemy 2.0 ORM Engine]
        Alembic[Alembic Migrations Engine]
        SQLite[(Local SQLite: careerbridge.db)]
        PostgreSQL[(Production PostgreSQL)]
    end

    %% Wiring
    UI_Landing --> Router
    UI_Student --> Router
    UI_Recruiter --> Router
    Router --> AuthCtx
    Router --> ToastCtx
    AuthCtx --> ApiClient
    ApiClient --> ViteProxy
    ViteProxy --> CORS
    CORS --> AuthRouter
    CORS --> StudentRouter
    CORS --> CareerRouter
    CORS --> RoadmapRouter
    CORS --> JobRouter
    CORS --> AppRouter
    CORS --> RecruiterRouter
    CORS --> ResumeRouter
    CORS --> InterviewRouter
    CORS --> AssistantRouter
    CORS --> AnalyticsRouter

    CareerRouter --> CI_Service
    JobRouter --> ME_Engine
    ResumeRouter --> RS_Service
    InterviewRouter --> IS_Service
    AssistantRouter --> AS_Service
    RoadmapRouter --> RM_Service
    AnalyticsRouter --> AN_Service

    CI_Service --> SQLAlchemy
    ME_Engine --> SQLAlchemy
    RS_Service --> SQLAlchemy
    IS_Service --> SQLAlchemy
    AS_Service --> SQLAlchemy
    RM_Service --> SQLAlchemy
    AN_Service --> SQLAlchemy

    SQLAlchemy --> SQLite
    SQLAlchemy -.-> PostgreSQL
    Alembic --> SQLAlchemy
```

### 2.2 Tier Decomposition & Data Flow

#### Client Tier
Built with modern web technologies:
- **React 19.2.8** featuring concurrent rendering primitives.
- **TypeScript 5.8** guaranteeing compile-time type safety across all domain entities.
- **Vite 8.3** delivering instant hot module replacement (HMR) and sub-second builds.
- **Three.js 0.174** managing the background 3D canvas with custom geometries, ambient particle fields, and mathematical spline curves.

#### API Gateway & Communication Protocol
- Frontend and backend communicate via **asynchronous RESTful JSON APIs** prefixed with `/api/v1`.
- In development, Vite's internal proxy maps browser requests from `http://localhost:5173/api` directly to `http://127.0.0.1:8000`, resolving cross-origin credential issues and Windows IPv6/IPv4 address resolution mismatches.
- All secure endpoints require the `Authorization: Bearer <JWT>` header.

#### Application Tier
Powered by **Python 3.13** and **FastAPI**:
- Asynchronous route handlers (`async def` and synchronous `def` where database I/O is offloaded to worker threads).
- **Pydantic v2** validation models with `ConfigDict(from_attributes=True)` validating inbound JSON bodies and outbound serialization.
- Strict Role-Based Access Control (`UserRole.STUDENT`, `UserRole.RECRUITER`, `UserRole.ADMIN`).

#### Persistence Tier
- **SQLAlchemy 2.0 ORM** employing modern declarative base syntax (`Mapped[T]` and `mapped_column()`).
- Session management through a scoped generator `get_db()` with automatic commit/rollback and connection pooling.

### 2.3 Dual-Database Architecture (SQLite & PostgreSQL)
To enable frictionless academic evaluation and seamless enterprise deployment:
1. **Local Zero-Setup Mode (Default)**: Utilizes SQLite (`sqlite:///./careerbridge.db`). Alembic migrations operate with `render_as_batch=True` to support SQLite schema alterations without dropping tables.
2. **Production Mode**: Switching requires only setting `DATABASE_URL=postgresql+psycopg2://user:pass@host:5432/careerbridge` in `.env`. The ORM models and Alembic migration scripts are 100% dialect-agnostic.

---

## 3. Algorithmic & AI Engine Architecture

### 3.1 Deterministic Skill Gap & Career Intelligence Engine
Located in `backend/app/services/career_intelligence.py`.

#### Core Mathematical Formula
The alignment score between a student profile and a target career role is computed deterministically:

$$\text{Alignment Score} = \left( \frac{\sum_{i=1}^{N} \min(S_i, R_i) \cdot W_i \cdot V_i}{\sum_{i=1}^{N} R_i \cdot W_i} \right) \times 100$$

Where:
- $S_i \in [1, 5]$: Student's demonstrated proficiency in skill $i$ (defaults to $0$ if unacquired).
- $R_i \in [1, 5]$: Required proficiency level specified for the target role.
- $W_i \in [0.8, 1.5]$: Importance weight of skill $i$ (Critical skills = $1.2 - 1.5$, Recommended = $0.8 - 1.0$).
- $V_i$: Verification factor:
  - $V_i = 1.00$ for verified skills (demonstrated via linked GitHub project or completed platform assessment).
  - $V_i = 0.85$ for unverified self-reported skills.
  - $V_i = 0.70$ for unassessed baseline competencies.

#### 6-Axis Radar Metric Distribution
The engine projects the student's competencies onto six standard industry dimensions:
1. **Algorithms & Computational Foundations**
2. **Systems Architecture & Low-Level Design**
3. **Machine Learning & Statistical Modeling**
4. **Data Engineering & Relational Pipelines**
5. **Software Engineering & Component Architecture**
6. **DevOps, Cloud & Production Infrastructure**

Each axis computes the ratio of student capability against role expectations, returning `current`, `required`, and `cohort_average` values for the interactive radar visualization.

#### Skill Gap Classification
- **Optimal / Proficient** ($\text{Gap} \le 10\%$): Marked as verified student strength.
- **Moderate / Needs Improvement** ($10\% < \text{Gap} \le 30\%$): Targeted for milestone practice.
- **Critical Gap** ($\text{Gap} > 30\%$): Prioritized at the top of the student's dynamic learning roadmap.

---

### 3.2 Transparent Job Matching Engine (70/30 Rule + Project Bonus)
Located in `backend/app/services/matching_engine.py`.

Unlike opaque black-box recruiters, CareerBridge implements a mathematically transparent matching model:

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRANSPARENT MATCH FORMULA                    │
├────────────────────────────────┬────────────────────────────────┤
│ Component                      │ Maximum Weight                 │
├────────────────────────────────┼────────────────────────────────┤
│ Required Skills Match          │ 70.0%                          │
│ Preferred Skills Match         │ 30.0%                          │
│ Project Evidence Bonus         │ +5.0%                          │
├────────────────────────────────┼────────────────────────────────┤
│ TOTAL MAXIMUM MATCH SCORE      │ 100.0% (Clamped)               │
└────────────────────────────────┴────────────────────────────────┘
```

#### Algorithmic Procedure
1. **String Normalization**: Skill names are normalized (lowercased, hyphens and slashes replaced with spaces) to ensure resilient matching across naming conventions (e.g., `react.js` matches `React`, `ci/cd` matches `CI-CD`).
2. **Competency Ingestion**: The engine compiles all student skills and scans `student_projects` for demonstrated technologies and tools.
3. **Required Skills Ratio**:
   $$\text{Req Score} = \left( \frac{\text{Matched Required Skills}}{\max(1, \text{Total Required Skills})} \right) \times 70.0$$
4. **Preferred Skills Ratio**:
   $$\text{Pref Score} = \left( \frac{\text{Matched Preferred Skills}}{\max(1, \text{Total Preferred Skills})} \right) \times 30.0$$
5. **Project Evidence Bonus**: If the student has at least one repository or live project link matching any required skill, an additional $+5.0\%$ is added.
6. **Explainable Breakdown**: The engine returns explicit lists of `matched_skills`, `missing_critical_skills`, and `recommended_to_learn` directly to the client interface.

---

### 3.3 ATS Resume NLP Diagnostic Engine
Located in `backend/app/services/resume_service.py`.

#### Pipeline Architecture
1. **Safe Byte Ingestion**: Accepts PDF or TXT uploads. PyPDF iterates through document pages, extracting plaintext while handling corrupted byte buffers via fallback UTF-8 decoding.
2. **Lexical Skill Extraction**: Matches document text against the platform's relational skill catalogue using regular expression word boundaries (`\b<skill>\b`).
3. **Target Role Comparative Diagnostics**: Compares identified skills against the requested target role's critical requirements, calculating a **Resume Readiness Score (0–100)**:
   - Found Skills Ratio: up to 50 points
   - Absence of Missing Critical Requirements: up to 30 points
   - Structural Quality & Impact Action Verbs: up to 20 points
4. **Action-Verb Enhancement Suggestions**: Scans candidate bullet points for weak verbs (e.g., *"helped with"*, *"worked on"*, *"handled"*) and suggests high-impact alternatives (e.g., *"Architected"*, *"Spearheaded"*, *"Optimized"*, *"Quantified"*).

---

### 3.4 Rubric-Grounded AI Mock Interview Simulator
Located in `backend/app/services/interview_service.py`.

#### Question Bank & Rubric Design
The simulator provides structured questions across four technical specializations:
1. **AI / Machine Learning Engineer** (Self-attention vs cross-attention, gradient explosion, loss divergence diagnostics).
2. **Full-Stack Systems Engineer** (ACID transactions vs eventual consistency, race condition prevention, React 19 server components).
3. **Data Scientist & Quantitative Analyst** (A/B test sample size formulas, feature collinearity, ROC-AUC calibration).
4. **Cloud & Distributed Systems Architect** (CAP theorem trade-offs, Raft consensus elections, container security isolation).

#### 4-Dimensional Evaluation Rubric
Student responses are graded across four standardized criteria:
1. **Technical Accuracy (0–100)**: Correctness of core architectural assertions and terminology.
2. **Reasoning & Depth (0–100)**: Ability to substantiate claims with first-principles reasoning.
3. **Practical Trade-offs (0–100)**: Awareness of computational cost, latency, scalability, and maintainability.
4. **Clarity & Communication (0–100)**: Conciseness, structure, and professional delivery.

The overall session score is recorded in `interview_sessions` alongside detailed feedback and model benchmark answers.

---

### 3.5 Contextual Career Assistant Engine (Zero-Hallucination)
Located in `backend/app/services/assistant_service.py`.

#### Grounded Knowledge Base
To prevent AI hallucinations, the assistant is deeply integrated with the platform's active database:
- Reads the logged-in student's target role, verified skills, and roadmap progress.
- Queries active job listings posted by verified employers.
- When answering career queries, references real open positions, actual required competencies, and specific platform learning resources.
- If an external LLM (Gemini, OpenAI, Anthropic) is configured via `backend/.env`, prompts are injected with grounded JSON context. If the provider times out or fails, the engine falls back to local intelligent generation seamlessly.

---

## 4. Relational Data Models & Database Schema

### 4.1 Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o| STUDENT_PROFILES : "has one"
    USERS ||--o| RECRUITER_PROFILES : "has one"
    USERS ||--o{ ASSISTANT_CONVERSATIONS : "starts"
    RECRUITER_PROFILES ||--o{ JOBS : "posts"
    RECRUITER_PROFILES }o--|| COMPANIES : "belongs to"

    STUDENT_PROFILES ||--o{ STUDENT_SKILLS : "possesses"
    STUDENT_PROFILES ||--o{ STUDENT_PROJECTS : "builds"
    STUDENT_PROFILES ||--o{ ROADMAPS : "follows"
    STUDENT_PROFILES ||--o{ APPLICATIONS : "submits"
    STUDENT_PROFILES ||--o{ SAVED_JOBS : "bookmarks"
    STUDENT_PROFILES ||--o{ RESUME_ANALYSES : "uploads"
    STUDENT_PROFILES ||--o{ INTERVIEW_SESSIONS : "conducts"

    SKILLS ||--o{ STUDENT_SKILLS : "referenced in"
    SKILLS ||--o{ ROLE_SKILL_REQUIREMENTS : "required by"
    CAREER_ROLES ||--o{ ROLE_SKILL_REQUIREMENTS : "demands"

    ROADMAPS ||--o{ ROADMAP_MILESTONES : "contains"
    JOBS ||--o{ APPLICATIONS : "receives"
    JOBS ||--o{ SAVED_JOBS : "saved by"
    INTERVIEW_SESSIONS ||--o{ INTERVIEW_QUESTIONS : "evaluates"
    ASSISTANT_CONVERSATIONS ||--o{ ASSISTANT_MESSAGES : "stores"
```

### 4.2 Complete Schema Specifications (15 Relational Tables)

#### 1. `users` Table
Stores primary identity and authentication credentials.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique user identity |
| `email` | String(255) | Unique, Not Null, Indexed | Login email address |
| `hashed_password` | String(255) | Not Null | Salted Bcrypt password hash |
| `role` | Enum | Not Null, Default: `STUDENT` | `STUDENT`, `RECRUITER`, `ADMIN` |
| `is_active` | Boolean | Default: `True` | Account activation state |
| `created_at` | DateTime | Default: `utcnow()` | Account creation timestamp |
| `updated_at` | DateTime | OnUpdate: `utcnow()` | Last profile update timestamp |

#### 2. `student_profiles` Table
Stores extended academic and career readiness information.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique student profile ID |
| `user_id` | Integer | FK(`users.id`), Unique, Not Null | Parent user account |
| `full_name` | String(128) | Not Null | Candidate display name |
| `avatar_url` | String(512) | Nullable | Profile image URI |
| `university` | String(255) | Nullable | University or institution |
| `degree` | String(128) | Nullable | e.g., Bachelor of Technology |
| `branch` | String(128) | Nullable | e.g., Computer Science & AI |
| `academic_year` | String(64) | Nullable | e.g., 3rd Year / Junior |
| `graduation_year` | Integer | Nullable | Projected graduation year |
| `location` | String(128) | Nullable | Candidate city / region |
| `target_role` | String(128) | Nullable | Primary targeted career track |
| `bio` | Text | Nullable | Professional summary |
| `github_url` | String(255) | Nullable | GitHub profile link |
| `portfolio_url` | String(255) | Nullable | Personal portfolio URL |
| `linkedin_url` | String(255) | Nullable | LinkedIn profile link |
| `career_readiness_score`| Float | Default: `0.0` | Cached aggregate readiness score |

#### 3. `recruiter_profiles` Table
Stores recruiter organizational association and contact info.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique recruiter profile ID |
| `user_id` | Integer | FK(`users.id`), Unique, Not Null | Parent user account |
| `company_id` | Integer | FK(`companies.id`), Nullable | Associated employer organization |
| `full_name` | String(128) | Not Null | Recruiter display name |
| `job_title` | String(128) | Nullable | e.g., Senior Technical Recruiter |
| `department` | String(128) | Nullable | e.g., Engineering Talent Acquisition |
| `phone_number` | String(32) | Nullable | Work contact telephone |

#### 4. `companies` Table
Represents employer organizations posting roles on CareerBridge.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique company ID |
| `name` | String(255) | Unique, Not Null | Legal company name |
| `logo_url` | String(512) | Nullable | Company brand logo URI |
| `website_url` | String(255) | Nullable | Official company URL |
| `industry` | String(128) | Nullable | Industry sector (e.g., AI Research) |
| `company_size` | String(64) | Nullable | e.g., 500-1,000 Employees |
| `location` | String(128) | Nullable | Headquarters location |
| `description` | Text | Nullable | Overview of company mission |
| `is_verified` | Boolean | Default: `False` | Platform verification badge |

#### 5. `skills` Table
Master taxonomy of engineering and computational skills.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique skill ID |
| `name` | String(128) | Unique, Not Null | Canonical skill name |
| `category` | String(64) | Not Null | e.g., Deep Learning, Web Systems |
| `description` | Text | Nullable | Mathematical & practical definition |

#### 6. `student_skills` Table
Association table linking students to acquired skills with evidence.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique student-skill record |
| `student_id` | Integer | FK(`student_profiles.id`), Not Null | Target student profile |
| `skill_id` | Integer | FK(`skills.id`), Not Null | Associated master skill |
| `proficiency` | Integer | Not Null, Default: `1` | Level scale from 1 (Novice) to 5 (Master) |
| `is_verified` | Boolean | Default: `False` | Verified through project or test |
| `source` | String(64) | Default: `"self_reported"` | Evidence source (project/assessment) |
| `evidence_url` | String(512) | Nullable | Direct GitHub repo or commit link |

#### 7. `career_roles` Table
Curated industry target roles.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique career role ID |
| `title` | String(128) | Not Null | e.g., AI / Machine Learning Engineer |
| `slug` | String(64) | Unique, Not Null | URL slug (e.g., `ai-ml`) |
| `category` | String(64) | Not Null | Industry sector |
| `description` | Text | Nullable | Role overview |
| `growth_outlook`| String(64) | Nullable | e.g., +34% YoY Hiring Volume |
| `avg_salary_range`| String(64) | Nullable | e.g., $125,000 - $185,000 |

#### 8. `role_skill_requirements` Table
Skill prerequisites demanded by specific career roles.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Integer | PK, Auto-increment | Unique requirement record |
| `role_id` | Integer | FK(`career_roles.id`), Not Null | Target role |
| `skill_id` | Integer | FK(`skills.id`), Not Null | Required skill |
| `required_proficiency` | Integer | Not Null, Default: `3` | Minimum expected level (1-5) |
| `importance` | String(32) | Default: `"critical"` | `"critical"` or `"recommended"` |
| `weight` | Float | Default: `1.0` | Weight multiplier in scoring formula |

#### 9. `roadmaps` & `roadmap_milestones` Tables
Structured learning paths and granular milestones.
- **`roadmaps`**: `id`, `student_id`, `target_role`, `title`, `description`, `total_weeks`, `progress_percent`.
- **`roadmap_milestones`**: `id`, `roadmap_id`, `step_number`, `title`, `description`, `deliverable`, `duration`, `status` (`pending`, `active`, `completed`), `skills_acquired` (JSON list), `resources` (JSON list).

#### 10. `jobs` & `saved_jobs` Tables
Employer openings and student bookmarks.
- **`jobs`**: `id`, `recruiter_id`, `title`, `company`, `location`, `workplace_type` (`Remote`, `Hybrid`, `Onsite`), `employment_type` (`Full-time`, `Internship`, `Contract`), `salary_range`, `description`, `category`, `required_skills` (JSON list), `preferred_skills` (JSON list), `is_active`, `created_at`, `deadline`.
- **`saved_jobs`**: `id`, `student_id`, `job_id`, `created_at`.

#### 11. `applications` Table
Tracks real candidate job application lifecycles.
- Columns: `id`, `job_id`, `student_id`, `status` (`SUBMITTED`, `UNDER_REVIEW`, `SHORTLISTED`, `INTERVIEW`, `OFFERED`, `REJECTED`), `cover_letter`, `applied_at`, `updated_at`.

#### 12. `interview_sessions` & `interview_questions` Tables
Mock interview history and evaluation.
- **`interview_sessions`**: `id`, `student_id`, `target_role`, `category`, `difficulty`, `status`, `overall_score`, `created_at`.
- **`interview_questions`**: `id`, `session_id`, `question_text`, `student_answer`, `score`, `feedback`, `rubric_scores` (JSON breakdown across 4 criteria).

#### 13. `resume_analyses` Table
Stores parsed resume metrics, ATS keyword matches, and verb suggestions.

#### 14. `assistant_conversations` & `assistant_messages` Tables
Stores multi-turn grounded dialogue between the student and the AI career mentor.

---

## 5. Backend API Specification (FastAPI v1)

### 5.1 Core Configuration & Security Framework
Located in `backend/app/core/`:
- **`config.py`**: Manages environment variables using Pydantic `BaseSettings`. Handles `DATABASE_URL`, `JWT_SECRET_KEY`, `ALGORITHM` (HS256), `ACCESS_TOKEN_EXPIRE_MINUTES` (43,200 min / 30 days), and optional cloud LLM API keys.
- **`security.py`**:
  - `verify_password(plain, hashed)`: Cryptographic verification via Bcrypt.
  - `get_password_hash(password)`: Generates salted Bcrypt password hash.
  - `create_access_token(data, expires_delta)`: Encodes JWT with expiration and user ID.
  - Dependency guards: `get_current_user` decodes token and queries database; `require_role(role)` enforces role-based authorization.

### 5.2 RESTful Domain Routers & Endpoints

| Domain | Route Prefix | Key Endpoints | Auth Level | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/api/v1/auth` | `POST /register`<br>`POST /login`<br>`GET /me`<br>`POST /forgot-password`<br>`POST /reset-password` | Public / Bearer | Registration, authentication, token issuance, and password recovery. |
| **Students** | `/api/v1/students` | `GET /me`<br>`PATCH /me`<br>`POST /skills`<br>`DELETE /skills/{id}`<br>`POST /projects` | Student | Profile reading, metadata editing, skill management, and project portfolio tracking. |
| **Careers** | `/api/v1/careers` | `GET /roles`<br>`GET /analysis`<br>`GET /skills` | Public / Student | Career role catalogue, skill gap analysis against target role, and master skill taxonomy. |
| **Roadmaps** | `/api/v1/roadmaps` | `GET /`<br>`POST /generate`<br>`PATCH /{id}/milestones/{mid}` | Student | Dynamic milestone generation, progress percentage calculation, and milestone completion toggling. |
| **Jobs** | `/api/v1/jobs` | `GET /`<br>`GET /{id}`<br>`GET /matched/list`<br>`POST /{id}/save`<br>`DELETE /{id}/save` | Public / Student | Opportunity exploration with category and workplace filtering, matched ranking, and bookmarking. |
| **Applications** | `/api/v1/applications` | `POST /submit`<br>`GET /my-applications` | Student | Job application submission with cover letters and student application status tracking. |
| **Recruiters** | `/api/v1/recruiter` | `GET /dashboard`<br>`GET /jobs`<br>`POST /jobs`<br>`PATCH /jobs/{id}`<br>`GET /applications`<br>`PATCH /applications/{id}/status`<br>`GET /candidates` | Recruiter | Recruiter telemetry, posting management, applicant pipeline status transitions, and talent search. |
| **Resumes** | `/api/v1/resumes` | `POST /analyze`<br>`GET /history` | Student | Safe multipart PDF/TXT text extraction, ATS keyword matching, and impact verb enhancement. |
| **Interviews** | `/api/v1/interviews` | `POST /start`<br>`POST /{id}/submit-answer`<br>`GET /history` | Student | AI mock interview session creation, multi-question rubric evaluation, and feedback scoring. |
| **Assistant** | `/api/v1/assistant` | `POST /chat`<br>`GET /conversations`<br>`GET /conversations/{id}` | Student / User | Grounded career mentor dialogue referencing live platform jobs and student profile data. |
| **Resources** | `/api/v1/resources` | `GET /`<br>`GET /role/{slug}` | Public / Student | Curated documentation, official tutorials, and open courses for skill progression. |
| **Analytics** | `/api/v1/analytics` | `GET /overview` | Public / All | Market demand frequency distribution, hiring growth trends, and observation telemetry. |

---

## 6. Frontend Architecture & Client State

### 6.1 React 19 + TypeScript + Vite Architecture
- **Single Page Application (SPA)** architecture bundled with Vite 8.
- Zero reliance on heavyweight CSS frameworks; completely constructed with tailored **Vanilla CSS Design Tokens** (`index.css`), yielding ultra-low bundle sizes and instant load times.
- Fully typed data layer: interfaces in `src/api/` match backend Pydantic schemas.

### 6.2 Routing Hierarchy & Route Guards
Configured via `react-router-dom` v7 in `src/App.tsx`:

```
/                             -> LandingPage (Master 3D WebGL Continuous Journey)
│
├── Public Layout (Navbar + Content + Footer)
│   ├── /about                -> AboutPage
│   ├── /features             -> FeaturesPage
│   ├── /opportunities        -> PublicOpportunitiesPage
│   ├── /login                -> LoginPage (Interactive with 1-Click Demo Personas)
│   ├── /register             -> RegisterPage
│   ├── /forgot-password      -> ForgotPasswordPage
│   ├── /reset-password       -> ResetPasswordPage
│   ├── /privacy              -> PrivacyPage
│   └── /terms                -> TermsPage
│
├── Student Layout (Slim Top Navigation Bar, Guarded)
│   ├── /student/dashboard    -> DashboardPage
│   ├── /student/profile      -> ProfilePage
│   ├── /student/skills       -> SkillsPage
│   ├── /student/career-guidance -> CareerGuidancePage
│   ├── /student/skill-gap    -> SkillGapPage
│   ├── /student/roadmap      -> RoadmapPage
│   ├── /student/learning     -> LearningPage
│   ├── /student/projects     -> ProjectsPage
│   ├── /student/resume       -> ResumePage
│   ├── /student/interview    -> InterviewPage
│   ├── /student/opportunities-> OpportunitiesPage
│   ├── /student/applications -> ApplicationsPage
│   ├── /student/saved        -> SavedJobsPage
│   ├── /student/assistant    -> AssistantPage
│   ├── /student/notifications-> NotificationsPage
│   └── /student/settings     -> SettingsPage
│
└── Recruiter Layout (Slim Top Navigation Bar, Guarded)
    ├── /recruiter/dashboard  -> RecruiterDashboardPage
    ├── /recruiter/company    -> CompanyPage
    ├── /recruiter/jobs       -> RecruiterJobsPage
    ├── /recruiter/jobs/new   -> PostJobPage
    ├── /recruiter/applications -> RecruiterApplicationsPage
    ├── /recruiter/candidates -> CandidatesPage
    ├── /recruiter/analytics  -> AnalyticsPage
    └── /recruiter/settings   -> RecruiterSettingsPage
```

### 6.3 Global State Management (AuthContext & ToastContext)
1. **`AuthContext` (`src/context/AuthContext.tsx`)**:
   - Manages active user authentication status, JWT token persistence in `localStorage`, and role switching.
   - Provides methods: `login(email, password)`, `register(...)`, `logout()`, `updateUser(...)`, and `switchPersona(role)`.
   - On application mount, verifies stored tokens against the backend `/auth/me` endpoint.
2. **`ToastContext` (`src/context/ToastContext.tsx`)**:
   - Manages queue-based floating feedback notifications (`success`, `error`, `info`, `warning`).
   - Renders animated toast popups with auto-dismiss timers and Lucide icon badges.

### 6.4 Resilient API Layer & Offline Demo Data Fallback
Located in `src/api/client.ts` and `src/api/demoData.ts`:
- **Centralized HTTP Client**: Wraps native `fetch` with token injection, timeout controllers, and automatic JSON response parsing.
- **Backend Health Probe**: The `checkHealth()` function monitors backend availability and latency, driving the live pulse indicator in the top navbar.
- **Graceful Offline Degradation**: When operating disconnected from the backend, API client methods fallback transparently to rich demo data (`demoData.ts`), ensuring zero-downtime demonstration capability.

---

## 7. Visual Design System & UI Architecture

### 7.1 Design Philosophy: Cinematic Cybernetic Glassmorphism
The visual design language communicates precision, technological sophistication, and academic rigor:
- **Atmospheric Depth**: Deep void backgrounds paired with subtle radial glows and multi-layered backdrop blur.
- **Frosted Glass Elevation**: Translucent card surfaces with high saturation, inset highlights, and gradient borders that simulate real frosted glass.
- **Tactile Responsiveness**: Interactive elements provide instant visual feedback through micro-animations, scale shifts, and glowing borders.

### 7.2 Design Tokens, Colors & CSS Variables
Extracted from `landing page/src/index.css`:

```css
:root {
  /* Surfaces & Backgrounds */
  --bg-primary: #05070D;              /* Deep Cyber Void */
  --bg-secondary: #0A0E18;            /* Dark Midnight Navy */
  --bg-card: rgba(10, 15, 29, 0.60);  /* Translucent Glass Base */
  --bg-card-hover: rgba(14, 21, 40, 0.72);
  --bg-glass: rgba(255, 255, 255, 0.035);
  --bg-glass-active: rgba(255, 255, 255, 0.08);

  /* Typography Colors */
  --text-primary: #F5F7FF;            /* Pure Crisp White */
  --text-secondary: #8D96AA;          /* Balanced Neutral Slate */
  --text-muted: #5A6478;              /* Subtle Dim Gray */

  /* Borders & Glass Dividers */
  --border-subtle: rgba(255, 255, 255, 0.09);
  --border-focus: rgba(255, 255, 255, 0.20);
  --border-highlight: rgba(167, 139, 250, 0.4);
  --border-glass: rgba(255, 255, 255, 0.12);

  /* Curated Vivid Accents */
  --accent-lavender: #A78BFA;         /* Primary Brand Glow */
  --accent-violet: #8B5CF6;           /* Deep Electric Violet */
  --accent-cyan: #38BDF8;             /* Algorithmic Sky Cyan */
  --accent-mint: #34D399;             /* Success & Verification Emerald */
  --accent-amber: #FBBF24;            /* Caution & Alert Gold */

  /* Soft Ambient Glows */
  --glow-lavender: rgba(167, 139, 250, 0.15);
  --glow-cyan: rgba(56, 189, 248, 0.15);
  --glow-mint: rgba(52, 211, 153, 0.12);

  /* Border Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Cubic Bezier Physics */
  --transition-smooth: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-spring: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 7.3 Typography Hierarchy & Font Pairing
- **Display Headings (`font-family: 'Space Grotesk'`)**: Applied to all `h1` through `h6` elements. Features geometric, modern letterforms with negative tracking (`letter-spacing: -0.025em`) for a futuristic, cinematic feel.
- **Body & Data Typography (`font-family: 'Inter'`)**: Applied to body copy, table cells, metric labels, and form controls. Ensures optimal legibility across high-density technical dashboards.

### 7.4 Glassmorphic Panels & Surface Elevation
The `.glass-panel` utility class implements multi-layered depth:
```css
.glass-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%), var(--bg-card);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.14),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  transition: var(--transition-smooth);
}
```

### 7.5 Sleek Top Navigation Bar Redesign
In Phase 9, traditional bulky 260px vertical sidebars were replaced by a modern, high-performance horizontal **Top Navigation Bar** (`height: 54px` / `66px`):
- Pushes navigation links to the horizontal header, freeing up 100% of horizontal viewport width for wide data tables, radar charts, and candidate pipelines.
- Features a live **AI Engine pulse indicator** showing backend status and latency.
- Profile pill displaying student initials, quick notification badges, and dropdown menus for workspace settings and sign out.

---

## 8. 3D WebGL Journey Canvas (Three.js Engine)

### 8.1 WebGL Pipeline & Continuous Spline Path
Located in `landing page/src/three/JourneyCanvas.tsx`:
- Rendered via a hardware-accelerated **`THREE.WebGLRenderer`** with `antialias: true`, `alpha: true`, and `ACESFilmicToneMapping`.
- Uses a **`THREE.CatmullRomCurve3`** centripetal spline with 12 mathematical control points traversing from the Hero origin ($Z = +6.0$) to the Future Horizon ($Z = -75.0$):

```
(1.4, -0.95, 6)   ──> Hero Origin (Traveler at Start)
(1.2, -0.9, 2.5)  ──> Curved Hero Transition
(0.5, -0.6, -2)   ──> Transition to Career Network
(0.0, 0.4, -13)   ──> Core Sphere (Career Intelligence Orbit)
(1.2, -0.8, -38)  ──> Learning Roadmap (Ascending Steps)
(0.4, -0.2, -55)  ──> Opportunity Matcher (Network Graph)
(0.0, 0.4, -75)   ──> Future Horizon (Summit & Archway)
```

### 8.2 Scroll-Synchronized Camera Choreography
- As the user scrolls through the landing page, `scrollProgress` (normalized $0.0$ to $1.0$) is tracked via a passive window listener.
- The camera position and look-at target interpolate smoothly along the 3D curve using linear easing (`MathUtils.lerp`).
- Damped mouse parallax adds subtle organic movement as the cursor moves across the viewport.

### 8.3 Interactive Visual Objects & Chapter Themes
1. **Spline Tube Geometry**: Built using `THREE.TubeGeometry` with 180 segments. Vertex colors blend seamlessly from Lavender (`#A78BFA`) through Sky Cyan (`#38BDF8`) to Mint (`#34D399`).
2. **Photon Traveler Bead**: A glowing white mesh accompanied by a `PointLight` that traverses the tube path in sync with scroll progress.
3. **Hero Traveler Silhouette**: Minimalist geometric humanoid figure on a glowing ring pedestal overlooking the journey ahead.
4. **Core Sphere Group**: A faceted icosahedron surrounded by an animated wireframe outer shell and orbital particle rings, symbolizing career intelligence.
5. **Roadmap Milestone Markers**: Ascending crystalline platforms representing educational milestones.
6. **Opportunity Network Nodes**: Interconnected cluster of glowing vertices representing matched industry roles.
7. **Future Horizon Summit**: Triumphant portal archway and summit traveler silhouette surrounded by radiant ambient particles.

### 8.4 Performance & Accessibility Adaptations
- Detects the `prefers-reduced-motion` media query to disable heavy parallax animations for users with motion sensitivity.
- Pixel ratio is clamped to $\min(\text{devicePixelRatio}, 2)$ to maintain 60 FPS on high-DPI retina displays.
- Efficiently disposes geometries, materials, and requestAnimationFrame loops on component unmount.

---

## 9. Comprehensive Page-by-Page UI/UX Specifications

### 9.1 The Master 3D Landing Page (6 Chapters)

#### Chapter 1: Hero Section (`Hero.tsx`)
- High-impact headline: *"Bridge Your Skills. Build Your Tomorrow."*
- Interactive primary CTAs: *"Explore Career Intelligence"* and *"For Tech Recruiters"*.
- Floating live metrics banner displaying platform stats (94% placement rate, 4 curated specializations, 100+ active roles).
- Smooth entry point to the 3D journey path.

#### Chapter 2: Career Network (`CareerNetwork.tsx`)
- Visual graph showing the interconnected relationship between academic curricula and industry role requirements.
- Highlights the flow of student competencies into machine learning, data engineering, full-stack development, and DevOps tracks.

#### Chapter 3: Career Intelligence (`CareerIntelligence.tsx`)
- Interactive demonstration of the **6-axis Skill Gap Radar**.
- Live role switcher allowing visitors to preview skill gaps for AI Engineer vs. Full-Stack Systems Engineer vs. Data Scientist roles.
- Explains the deterministic scoring methodology with clear visual formulas.

#### Chapter 4: Dynamic Learning Roadmap (`LearningRoadmap.tsx`)
- Step-by-step milestone timeline showcasing estimated weekly hours, deliverables, and acquired competencies.
- Interactive milestone toggle previewing real-time progress percentage updates.

#### Chapter 5: Opportunity Matcher (`OpportunityMatcher.tsx`)
- Connected directly to the live backend `/api/v1/jobs` API.
- Displays realistic job cards with transparent match score breakdowns (e.g., *"92% Match: 5/5 Required Skills, +5% Project Bonus"*).
- Category filters (AI/ML, Web Systems, Cloud) and workplace badges (Remote, Hybrid, Onsite).

#### Chapter 6: Final Call to Action (`FinalCTA.tsx`)
- High-energy summit conclusion with celebratory particle effects.
- Dual action buttons directing students and recruiters to instantaneous registration.

---

### 9.2 Public & Authentication Pages

#### Interactive Sign In Page (`LoginPage.tsx`)
Redesigned in Phase 10 with interactive usability features:
- **1-Click Demo Persona Cards**:
  - **Alex Rivera (Student)**: Auto-fills `student@careerbridge.ai` / `student123` with a single click.
  - **Sarah Chen (Recruiter)**: Auto-fills `recruiter@deepmind.com` / `recruiter123` with a single click.
- **Interactive Password Controls**: `Eye` / `EyeOff` visibility toggle buttons.
- **Real-Time Caps Lock Detection**: Warning banner appears instantly when Caps Lock is active.
- **Dynamic Email Validation**: Real-time syntax validation with green checkmark indicators.
- **Stepped Authentication Progress**: Displays multi-step feedback (*"Verifying credentials..."* $\rightarrow$ *"Retrieving JWT token..."* $\rightarrow$ *"Redirecting..."*) followed by celebratory Canvas Confetti on success.

#### Registration Page (`RegisterPage.tsx`)
- Role selector toggle (`Student` vs. `Recruiter`).
- Full form validation with password strength meter, email uniqueness check, and terms acceptance.

#### Additional Public Pages
- **About Page (`AboutPage.tsx`)**: Platform mission, DeepMind-inspired algorithmic ethics, and founding story.
- **Features Page (`FeaturesPage.tsx`)**: In-depth breakdown of all 6 platform intelligence engines.
- **Public Opportunities (`PublicOpportunitiesPage.tsx`)**: Searchable and filterable job directory accessible to unregistered visitors.
- **Legal Pages (`PrivacyPage.tsx`, `TermsPage.tsx`)**: Complete GDPR-compliant data privacy policies and terms of service.

---

### 9.3 Student Portal (16 Sub-Pages)

1. **Dashboard (`DashboardPage.tsx`)**: Central command center featuring the career readiness gauge, active milestone countdown, top matched opportunities, and quick action cards.
2. **Profile (`ProfilePage.tsx`)**: Academic details, target career role, biographical summary, and repository links (GitHub, LinkedIn, Portfolio).
3. **Skills (`SkillsPage.tsx`)**: Comprehensive skill inventory management. Add skills with proficiency sliders (1–5) and provide verifiable GitHub project evidence.
4. **Career Guidance (`CareerGuidancePage.tsx`)**: High-level guidance overview comparing candidate skills against industry career paths.
5. **Skill Gap Analysis (`SkillGapPage.tsx`)**: Interactive 6-axis SVG radar visualization, critical missing competencies list, and tailored recommendations.
6. **Dynamic Roadmap (`RoadmapPage.tsx`)**: Complete multi-week curriculum broken into sequential milestones. Check off deliverables to trigger real-time progress recalculation.
7. **Curated Learning (`LearningPage.tsx`)**: Filterable library of free and open-access courses, documentation, and tutorials mapped directly to student skill gaps.
8. **Projects Portfolio (`ProjectsPage.tsx`)**: Showcase engineering projects with repository URLs, live demo links, and tagged technology stacks that feed the $+5\%$ match bonus.
9. **AI Resume Diagnostics (`ResumePage.tsx`)**: PDF/TXT drag-and-drop uploader, ATS readiness score gauge, missing keyword alerts, and high-impact action verb suggestions.
10. **AI Mock Interview (`InterviewPage.tsx`)**: Interactive practice simulator with question timer, answer input, 4-axis rubric scoring, and model benchmark comparisons.
11. **Opportunity Explorer (`OpportunitiesPage.tsx`)**: Full job search interface with transparent match percentages, requirement breakdowns, and one-click application submission.
12. **Applications Tracker (`ApplicationsPage.tsx`)**: Real-time status pipeline tracking submitted applications (`SUBMITTED` $\rightarrow$ `UNDER_REVIEW` $\rightarrow$ `SHORTLISTED` $\rightarrow$ `OFFERED`).
13. **Saved Jobs (`SavedJobsPage.tsx`)**: Bookmarked positions saved for later review.
14. **AI Assistant (`AssistantPage.tsx`)**: Grounded multi-turn conversational mentor answering career questions using live platform database records.
15. **Notifications (`NotificationsPage.tsx`)**: System alerts regarding application status changes, new matching jobs, and milestone reminders.
16. **Settings (`SettingsPage.tsx`)**: Password changes, notification preferences, and account management.

---

### 9.4 Recruiter Portal (8 Sub-Pages)

1. **Recruiter Dashboard (`RecruiterDashboardPage.tsx`)**: Key recruiting metrics (active job postings, total applicants, shortlisted talent, pipeline velocity).
2. **Company Profile (`CompanyPage.tsx`)**: Manage company branding, culture description, website link, and industry tags.
3. **Job Postings Management (`RecruiterJobsPage.tsx`)**: List and status view of all open, paused, and closed company listings.
4. **Post New Role (`PostJobPage.tsx`)**: Structured job creation wizard with required vs. preferred skill tag pickers, salary ranges, and workplace type selection.
5. **Applicant Pipeline (`RecruiterApplicationsPage.tsx`)**: Pipeline management interface for moving candidates across stages (`UNDER_REVIEW`, `SHORTLISTED`, `INTERVIEW`, `OFFERED`, `REJECTED`).
6. **Candidate Discovery (`CandidatesPage.tsx`)**: Search talent database by skill keywords, match readiness, and academic degree, with privacy-guarded outreach.
7. **Talent Analytics (`AnalyticsPage.tsx`)**: Labor market demand heatmaps, skill frequency distributions, and candidate supply curves.
8. **Recruiter Settings (`RecruiterSettingsPage.tsx`)**: Hiring team preferences, email alerts, and organizational settings.

---

## 10. Testing, Security & Deployment Guide

### 10.1 Backend Automated Test Suite (Pytest)
Located in `backend/tests/`:
- **17 automated test cases** validating core platform functionality:
  1. `test_auth.py`: Registration, duplicate email rejection, Bcrypt verification, JWT token issuance, and `/me` validation.
  2. `test_career_intelligence.py`: Deterministic skill gap scoring formulas, verification bonus factor calculation, and radar axis projection.
  3. `test_roadmap.py`: Roadmap milestone generation and completion percentage recalculation.
  4. `test_jobs_applications.py`: 70/30 matching mathematics, project bonus application, application lifecycle transitions, and duplicate prevention.
  5. `test_ai_services.py`: Resume keyword extraction, interview rubric scoring, and graceful AI fallback.
- **Execution Command**:
  ```bash
  cd backend
  python -m pytest tests -v
  ```
- **Result**: **17 passed in ~1.6s**.

### 10.2 Frontend Build Verification
- Validated via TypeScript compiler and Vite production build:
  ```bash
  cd "landing page"
  npm run build
  ```
- **Result**: `tsc -b && vite build` succeeds with **0 errors in <500ms**, generating an optimized production bundle.

### 10.3 Security Auditing & Privacy Boundaries
- **Password Hashing**: Bcrypt with auto-generated salt; plain text passwords are never logged or stored.
- **Token Security**: HS256 signed JWT tokens containing user ID subject claims.
- **Privacy Guards**: Student email and phone numbers are hidden from recruiter discovery searches until an application is officially moved to `SHORTLISTED` or `INTERVIEW` stage.
- **SQL Injection Prevention**: SQLAlchemy parameterized queries eliminate SQL injection vulnerabilities.
- **XSS Mitigation**: React JSX automatic string escaping prevents cross-site scripting attacks.

### 10.4 Local & Production Deployment Setup

#### One-Click Local Launch (Windows)
1. Run `start_backend.bat` in one terminal window (starts Uvicorn on port 8000).
2. Run `start_frontend.bat` in a second terminal window (starts Vite on port 5173).
3. Access the application at `http://localhost:5173`.

#### Production Deployment Checklist
1. Configure a production PostgreSQL database instance.
2. Set environment variables:
   ```env
   DATABASE_URL=postgresql+psycopg2://user:password@host:5432/careerbridge
   JWT_SECRET_KEY=generate_a_cryptographically_secure_random_string_64_chars
   ENVIRONMENT=production
   ```
3. Run database migrations: `alembic upgrade head`
4. Seed initial catalogue: `python -m app.db.seed`
5. Build the React frontend: `npm run build` in `landing page/` and serve static assets via Nginx or Cloudflare Pages.
6. Run Uvicorn behind a production reverse proxy with Gunicorn worker processes:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
   ```

---

## 11. Project Conclusion & Summary Table

CareerBridge AI represents a complete, mathematically grounded, and visually stunning career platform engineered for modern technical talent.

| Dimension | Implementation Details |
| :--- | :--- |
| **Frontend Framework** | React 19.2 + TypeScript 5.8 + Vite 8.3 + React Router DOM 7 |
| **Visual Styling** | Bespoke Dark Glassmorphism tokens (`index.css`), Space Grotesk + Inter |
| **3D Visualization** | Three.js 0.174 continuous WebGL Catmull-Rom spline with shader gradients |
| **Backend Framework** | Python 3.13 + FastAPI 0.115 + Pydantic v2 |
| **Database & ORM** | SQLAlchemy 2.0 + SQLite (Default Zero-Setup) / PostgreSQL (Production) |
| **Schema Migrations** | Alembic 1.20 with SQLite batch migration mode |
| **Security & Auth** | Salted Bcrypt + HS256 JWT tokens + RBAC Dependency Guards |
| **AI Intelligence** | Local Intelligent Deterministic Engines + Pluggable Cloud LLM Fallback |
| **Automated Testing** | 17 Pytest automated test cases passing in 1.6s |
| **Production Build** | `npm run build` passing with 0 TypeScript/bundler errors |

---
*Developed for CareerBridge AI — AI-Powered Career Intelligence & Recruitment Platform.*
