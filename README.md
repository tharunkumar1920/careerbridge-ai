<p align="center">
  <img src="skill-link-full.png" alt="Skill Link Logo" width="360" />
</p>

# Skill Link

> **AI-Powered Career Intelligence, Educational Guidance, and Recruitment Platform**  
> *"Bridge Your Skills. Build Your Tomorrow."*

---

## 1. System Overview

Skill Link connects college talent with verified industry opportunities through an end-to-end intelligence pipeline:

```
STUDENT PROFILE
       ↓
SKILL ASSESSMENT & EVIDENCE
       ↓
CAREER RECOMMENDATIONS (4 Specializations)
       ↓
DETERMINISTIC SKILL GAP ANALYSIS
       ↓
DYNAMIC LEARNING ROADMAP & MILESTONES
       ↓
AI MOCK INTERVIEWS (Rubric-Grounded)
       ↓
AI RESUME DIAGNOSTICS & ATS OPTIMIZATION
       ↓
TRANSPARENT MATCHING ENGINE (70% Req / 30% Pref / +5% Projects)
       ↓
RECRUITER PIPELINE & VERIFIED APPLICATIONS
```

---

## 2. Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Vanilla CSS tokens, glassmorphism, responsive CSS grid
- **3D & Visuals**: Three.js 3D WebGL Journey Canvas (`JourneyCanvas.tsx`), Lucide icons, Canvas Confetti
- **State & Routing**: React Router v7 (`react-router-dom`), Custom React Context (`AuthContext`, `ToastContext`)

### Backend
- **Framework**: Python 3.13 + FastAPI
- **Data Validation & Schemas**: Pydantic v2
- **ORM & Database**: SQLAlchemy 2.0 with SQLite (default local zero-setup) and PostgreSQL (production ready)
- **Migrations**: Alembic 1.20 with SQLite batch migration mode
- **Security**: Passwords salted and hashed with Bcrypt, JWT tokens (HS256)
- **AI / NLP**: Built-in intelligent local deterministic & grounded NLP services + optional pluggable LLM providers (Gemini, OpenAI, Anthropic)
- **Testing**: Pytest with HTTPX TestClient (17 automated tests passing)

---

## 3. Directory Layout

```
ai final real project/
├── landing page/               # React 19 + Vite Frontend
│   ├── src/
│   │   ├── api/                # Typed API client layer (auth, student, recruiter, public)
│   │   ├── components/         # Landing page & shared UI components
│   │   │   ├── shared/         # Button, Card, Badge, Skeleton, etc.
│   │   │   ├── Hero.tsx        # Chapter 1 Hero
│   │   │   ├── CareerNetwork.tsx # Chapter 2 Network
│   │   │   ├── CareerIntelligence.tsx # Chapter 3
│   │   │   ├── LearningRoadmap.tsx    # Chapter 4
│   │   │   ├── OpportunityMatcher.tsx # Chapter 5
│   │   │   ├── FinalCTA.tsx    # Chapter 6
│   │   │   ├── Navbar.tsx      # Top floating bar
│   │   │   ├── Footer.tsx      # Landing footer
│   │   │   └── AuthModal.tsx   # Fast auth dialog
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── layouts/            # PublicLayout, StudentLayout, RecruiterLayout
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx # Master 3D landing page experience
│   │   │   ├── public/         # About, Features, Opportunities, Login, Register, Terms, Privacy
│   │   │   ├── student/        # 14 Full Student portal screens (Dashboard, Roadmap, Skills, etc.)
│   │   │   └── recruiter/      # 7 Full Recruiter portal screens (Jobs, Candidates, Pipeline, etc.)
│   │   └── three/              # Three.js 3D WebGL Journey Canvas
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── backend/                    # FastAPI Backend
│   ├── alembic/                # Database migrations
│   ├── app/
│   │   ├── api/v1/             # 12 Domain API routers (auth, students, careers, roadmaps, jobs, etc.)
│   │   ├── core/               # Configuration, Bcrypt security, logging, exceptions
│   │   ├── db/                 # Database engine, session maker, initial data seed
│   │   ├── models/             # SQLAlchemy ORM models (User, Profile, Skill, Job, etc.)
│   │   ├── schemas/            # Pydantic v2 schemas
│   │   └── services/           # Business logic & AI algorithms
│   │       ├── career_intelligence.py # Skill gap & readiness formulas
│   │       ├── roadmap_service.py     # Milestone tracking
│   │       ├── matching_engine.py     # Explainable candidate matching
│   │       ├── resume_service.py      # PDF text parser & keyword diagnostics
│   │       ├── interview_service.py   # Rubric-evaluated mock interviews
│   │       ├── assistant_service.py   # Grounded career advisory
│   │       └── analytics_service.py   # Market demand frequencies
│   ├── tests/                  # 17 automated tests
│   ├── requirements.txt
│   └── careerbridge.db         # Pre-seeded SQLite database
├── DEVELOPMENT_STATUS.md       # Comprehensive audit & phase progress
├── .env.example                # Example environment variables
└── README.md
```

---

## 4. Quick Start Guide

### Prerequisites
- Python 3.10+ (tested with Python 3.13)
- Node.js 18+ (tested with Node.js 20+)
- npm or pnpm

---

### Step 1: Start the FastAPI Backend

1. Open a terminal in `backend/`:
   ```bash
   cd "backend"
   ```
2. (Optional) Create and activate a virtual environment:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Verify or apply database migrations:
   ```bash
   alembic upgrade head
   ```
5. Seed initial roles, skills, and demonstration accounts:
   ```bash
   python -m app.db.seed
   ```
6. Start the backend development server:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   - API Docs (Swagger): `http://127.0.0.1:8000/docs`
   - Healthcheck: `http://127.0.0.1:8000/health`

---

### Step 2: Start the React Frontend

1. Open a second terminal in `landing page/`:
   ```bash
   cd "landing page"
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Build check (TypeScript & Vite bundling):
   ```bash
   npm run build
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   - Web Application: `http://localhost:5173`

---

## 5. Ready-to-Use Demonstration Accounts

The database comes pre-seeded with full profiles, skills, and job postings:

| Account Type | Email | Password | Access / Features |
| :--- | :--- | :--- | :--- |
| **Student** | `student@skilllink.ai` | `student123` | Full dashboard, AI roadmaps, mock interview rubrics, resume analyzer, opportunity matching |
| **Recruiter** | `recruiter@deepmind.com` | `recruiter123` | Post roles, candidate search, application pipeline status changes, talent analytics |

*Note: You can also register your own student or recruiter account with any email from the `/register` page.*

---

## 6. Running Automated Tests

Run the backend test suite anytime to verify authentication, profile authorization, matching mathematics, and AI fallback behavior:

```bash
cd backend
python -m pytest tests -v
```

Expected result: **17 passed in ~1.6s**.

---

## 7. PostgreSQL Configuration (Optional Production Setup)

By default, the backend runs instantly using SQLite (`backend/careerbridge.db`) with zero external service configuration required. To switch to a PostgreSQL instance:

1. Install psycopg2: `pip install psycopg2-binary`
2. Update `DATABASE_URL` in `backend/.env`:
   ```env
   DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/careerbridge
   ```
3. Run Alembic migrations:
   ```bash
   alembic upgrade head
   ```
4. Seed initial records:
   ```bash
   python -m app.db.seed
   ```

---

## 8. AI Provider Configuration

Skill Link operates fully in **Local Intelligent Mode** out-of-the-box:
- Deterministic skill gap scoring (70% required / 30% preferred / +5% project evidence)
- Rule-based keyword and action verb resume diagnostics
- Standardized rubric mock interview scoring
- Grounded assistant that references active platform database records

To optionally connect external cloud LLM providers, set `LLM_PROVIDER` in `backend/.env`:

```env
# Optional: 'gemini', 'openai', or 'anthropic'
LLM_PROVIDER=local_intelligent
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

If an external key is absent or network requests time out, the system automatically falls back gracefully to the deterministic engine without breaking user workflows.

---

## 9. License

MIT License. Developed for Skill Link.
