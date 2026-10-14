from sqlalchemy.orm import Session
from app.core.security import get_password_hash
from app.models.user import User, UserRole
from app.models.profile import StudentProfile, RecruiterProfile
from app.models.career import Skill, StudentSkill, CareerRole, RoleSkillRequirement
from app.models.roadmap import Roadmap, RoadmapMilestone
from app.models.learning import LearningResource, StudentProject
from app.models.job import Job
from app.core.logging import logger


def seed_database(db: Session):
    """Seed initial skills, roles, resources, jobs, and default demo accounts."""
    # Check if database is already seeded
    if db.query(CareerRole).first():
        logger.info("Database already seeded. Skipping initial seed.")
        return

    logger.info("Seeding database with skills, roles, learning resources, and demonstration accounts...")

    # 1. Skills Catalogue
    skills_data = [
        {"name": "Python Systems & Vectorization", "category": "Programming", "description": "High-performance Python, NumPy vectorization, Cython, and memory optimization."},
        {"name": "Machine Learning Fundamentals", "category": "Core ML", "description": "Loss surfaces, convex optimization, regularization, cross-validation, and bias-variance tradeoff."},
        {"name": "Deep Learning & PyTorch", "category": "Deep Learning", "description": "Backpropagation, automatic differentiation, custom autograd Functions, tensors, GPU execution."},
        {"name": "Data Structures & Algorithms", "category": "Computer Science", "description": "Graphs, dynamic programming, tree traversals, spatial indexing, amortized bounds."},
        {"name": "Cloud Infrastructure & MLOps", "category": "Engineering", "description": "Docker containerization, Kubernetes, Triton inference server, distributed checkpointing, CI/CD."},
        {"name": "Transformers & LLMs", "category": "AI/ML", "description": "Multi-head attention, RoPE positional encodings, FlashAttention, quantization (GGUF/AWQ), fine-tuning (LoRA/QLoRA)."},
        {"name": "SQL & Relational Databases", "category": "Databases", "description": "PostgreSQL, schema indexing, ACID transactions, relational normal forms, query execution plans."},
        {"name": "FastAPI & Microservices", "category": "Web Systems", "description": "Asynchronous REST endpoints, Pydantic validation, OpenAPI specifications, dependency injection."},
        {"name": "TypeScript & React", "category": "Frontend", "description": "Modern typed component architectures, state hooks, virtual DOM, accessible UI components."},
        {"name": "Distributed Systems", "category": "Systems", "description": "Consensus algorithms (Raft), message queues (Kafka), cache coherence, RPCs, sharding."},
    ]

    skill_records = {}
    for s_item in skills_data:
        skill = Skill(name=s_item["name"], category=s_item["category"], description=s_item["description"])
        db.add(skill)
        db.flush()
        skill_records[s_item["name"]] = skill

    # 2. Career Roles
    roles_data = [
        {
            "title": "AI / Machine Learning Engineer",
            "slug": "ai-ml",
            "category": "Artificial Intelligence",
            "description": "Designs, trains, and scales neural models, production inference engines, and mathematical pipelines.",
            "growth_outlook": "+34% YoY Hiring Volume",
            "avg_salary_range": "$125,000 - $185,000",
            "reqs": [
                ("Python Systems & Vectorization", 4, "critical", 1.2),
                ("Machine Learning Fundamentals", 4, "critical", 1.3),
                ("Deep Learning & PyTorch", 4, "critical", 1.4),
                ("Data Structures & Algorithms", 4, "recommended", 1.0),
                ("Cloud Infrastructure & MLOps", 3, "recommended", 0.9),
                ("Transformers & LLMs", 4, "recommended", 1.1),
            ]
        },
        {
            "title": "Full-Stack Systems Engineer",
            "slug": "full-stack",
            "category": "Software Engineering",
            "description": "Builds end-to-end resilient web architectures, responsive client interfaces, and robust backend microservices.",
            "growth_outlook": "+24% YoY Hiring Volume",
            "avg_salary_range": "$115,000 - $165,000",
            "reqs": [
                ("TypeScript & React", 5, "critical", 1.4),
                ("FastAPI & Microservices", 4, "critical", 1.3),
                ("SQL & Relational Databases", 4, "critical", 1.2),
                ("Data Structures & Algorithms", 4, "critical", 1.1),
                ("Cloud Infrastructure & MLOps", 3, "recommended", 0.8),
            ]
        },
        {
            "title": "Data Scientist & Quantitative Analyst",
            "slug": "data-science",
            "category": "Data & Analytics",
            "description": "Extracts empirical signals, constructs statistical forecasts, and drives product telemetry and causal inference.",
            "growth_outlook": "+22% YoY Hiring Volume",
            "avg_salary_range": "$110,000 - $160,000",
            "reqs": [
                ("Python Systems & Vectorization", 5, "critical", 1.3),
                ("Machine Learning Fundamentals", 4, "critical", 1.3),
                ("SQL & Relational Databases", 5, "critical", 1.4),
                ("Data Structures & Algorithms", 3, "recommended", 0.9),
            ]
        },
        {
            "title": "Cloud & Distributed Systems Architect",
            "slug": "devops-cloud",
            "category": "Cloud & Infrastructure",
            "description": "Architects high-availability distributed backbones, zero-downtime container pipelines, and scalable compute clusters.",
            "growth_outlook": "+29% YoY Hiring Volume",
            "avg_salary_range": "$130,000 - $190,000",
            "reqs": [
                ("Cloud Infrastructure & MLOps", 5, "critical", 1.5),
                ("Distributed Systems", 5, "critical", 1.4),
                ("Python Systems & Vectorization", 3, "recommended", 0.9),
                ("SQL & Relational Databases", 4, "critical", 1.1),
            ]
        }
    ]

    for r_item in roles_data:
        role = CareerRole(
            title=r_item["title"],
            slug=r_item["slug"],
            category=r_item["category"],
            description=r_item["description"],
            growth_outlook=r_item["growth_outlook"],
            avg_salary_range=r_item["avg_salary_range"]
        )
        db.add(role)
        db.flush()

        for skill_name, req_prof, importance, weight in r_item["reqs"]:
            if skill_name in skill_records:
                req = RoleSkillRequirement(
                    role_id=role.id,
                    skill_id=skill_records[skill_name].id,
                    required_proficiency=req_prof,
                    importance=importance,
                    weight=weight
                )
                db.add(req)

    # 3. Curated Learning Resources
    resources_data = [
        {
            "title": "Deep Learning Specialization",
            "description": "Master deep neural networks, convolutional architectures, sequence models, and parameter optimization.",
            "topic": "Deep Learning",
            "skill_name": "Deep Learning & PyTorch",
            "resource_type": "course",
            "provider": "DeepLearning.AI",
            "url": "https://www.deeplearning.ai/courses/deep-learning-specialization/",
            "difficulty": "Intermediate",
            "duration_hours": 35,
            "rating": 4.9,
            "tags": ["Neural Networks", "PyTorch", "Backprop", "CNN", "RNN"]
        },
        {
            "title": "PyTorch Official Deep Dive Tutorials",
            "description": "Production guides on torch.autograd, custom loss functions, and DistributedDataParallel.",
            "topic": "Deep Learning Frameworks",
            "skill_name": "Deep Learning & PyTorch",
            "resource_type": "docs",
            "provider": "PyTorch Foundation",
            "url": "https://pytorch.org/tutorials/",
            "difficulty": "Intermediate",
            "duration_hours": 15,
            "rating": 4.8,
            "tags": ["Tensors", "Autograd", "DDP", "CUDA"]
        },
        {
            "title": "CS229: Machine Learning Course Materials",
            "description": "Stanford University's definitive lecture series on loss formulations, support vectors, and statistical theory.",
            "topic": "Core ML Theory",
            "skill_name": "Machine Learning Fundamentals",
            "resource_type": "course",
            "provider": "Stanford Online",
            "url": "https://cs229.stanford.edu/",
            "difficulty": "Advanced",
            "duration_hours": 45,
            "rating": 4.9,
            "tags": ["Optimization", "Convexity", "Gradient Descent", "Probabilistic Models"]
        },
        {
            "title": "Hugging Face NLP Course: Transformer Architecture & Fine-Tuning",
            "description": "Hands-on implementation of self-attention mechanisms, causal language modeling, and PEFT/LoRA adapters.",
            "topic": "Transformers & LLMs",
            "skill_name": "Transformers & LLMs",
            "resource_type": "course",
            "provider": "Hugging Face",
            "url": "https://huggingface.co/learn/nlp-course/",
            "difficulty": "Intermediate",
            "duration_hours": 20,
            "rating": 4.9,
            "tags": ["Transformers", "Attention", "LoRA", "Tokenizer", "HF Accelerate"]
        },
        {
            "title": "Full Stack FastAPI and React Blueprint",
            "description": "Architecting type-safe asynchronous web applications with PostgreSQL and React 19.",
            "topic": "Modern Web Systems",
            "skill_name": "FastAPI & Microservices",
            "resource_type": "tutorial",
            "provider": "FastAPI Documentation",
            "url": "https://fastapi.tiangolo.com/tutorial/",
            "difficulty": "Beginner",
            "duration_hours": 12,
            "rating": 4.8,
            "tags": ["FastAPI", "AsyncIO", "Pydantic", "SQLAlchemy", "REST"]
        },
        {
            "title": "Production Kubernetes & MLOps Pipelines",
            "description": "Deploying Triton inference clusters, horizontal pod autoscalers, and Prometheus metrics.",
            "topic": "MLOps",
            "skill_name": "Cloud Infrastructure & MLOps",
            "resource_type": "project",
            "provider": "Cloud Native Computing Foundation",
            "url": "https://kubernetes.io/docs/tutorials/",
            "difficulty": "Advanced",
            "duration_hours": 28,
            "rating": 4.7,
            "tags": ["Kubernetes", "Docker", "Triton", "Inference", "Prometheus"]
        }
    ]

    for res in resources_data:
        db.add(LearningResource(**res))

    # 4. Default Demo Accounts
    # Student Demo Account: student@skilllink.ai / student123
    student_user = User(
        email="student@skilllink.ai",
        hashed_password=get_password_hash("student123"),
        role=UserRole.STUDENT,
        is_active=True,
        is_verified=True
    )
    db.add(student_user)
    db.flush()

    student_profile = StudentProfile(
        user_id=student_user.id,
        full_name="Alex Rivera",
        university="Stanford University",
        degree="B.S.",
        branch="Computer Science",
        academic_year="Junior (3rd Year)",
        graduation_year=2026,
        location="Palo Alto, CA",
        target_role="AI / Machine Learning Engineer",
        bio="Junior Computer Science student at Stanford passionate about foundational ML, distributed transformer training, and intelligent systems.",
        github_url="https://github.com/alexrivera-ai",
        portfolio_url="https://alexrivera.dev",
        linkedin_url="https://linkedin.com/in/alexrivera-ai",
        career_readiness_score=72.5
    )
    db.add(student_profile)
    db.flush()

    # Assign Alex's existing student skills
    initial_skills = [
        ("Python Systems & Vectorization", 4, True, "project_evidence"),
        ("Machine Learning Fundamentals", 3, True, "assessment"),
        ("Deep Learning & PyTorch", 2, False, "self_reported"),
        ("Data Structures & Algorithms", 3, True, "assessment"),
        ("Cloud Infrastructure & MLOps", 1, False, "self_reported"),
        ("Transformers & LLMs", 2, False, "self_reported"),
        ("SQL & Relational Databases", 3, True, "course_certificate")
    ]
    for s_name, prof, verified, src in initial_skills:
        if s_name in skill_records:
            db.add(StudentSkill(
                student_id=student_profile.id,
                skill_id=skill_records[s_name].id,
                proficiency=prof,
                is_verified=verified,
                source=src
            ))

    # Add Alex's existing projects
    db.add(StudentProject(
        student_id=student_profile.id,
        title="Distributed Transformer Attention Profiler",
        description="Benchmarked custom CUDA FlashAttention vs standard PyTorch autograd across batch sequences, achieving 2.8x speedup.",
        technologies=["Python", "PyTorch", "CUDA", "NumPy"],
        skills_demonstrated=["Deep Learning & PyTorch", "Python Systems & Vectorization"],
        repo_url="https://github.com/alexrivera-ai/attention-profiler",
        status="completed"
    ))
    db.add(StudentProject(
        student_id=student_profile.id,
        title="High-Throughput Vector Embedding Indexer",
        description="Engineered an asynchronous FAISS vector index ingestion worker with FastAPI streaming endpoints.",
        technologies=["FastAPI", "Python", "FAISS", "Docker"],
        skills_demonstrated=["Python Systems & Vectorization", "FastAPI & Microservices"],
        repo_url="https://github.com/alexrivera-ai/vector-stream",
        status="completed"
    ))

    # Add Alex's personalized roadmap
    roadmap = Roadmap(
        student_id=student_profile.id,
        target_role="AI / Machine Learning Engineer",
        title="Personalized AI/ML Systems Mastery Roadmap",
        description="Targeted 12-week pathway tailored to close critical gaps in Deep Learning, PyTorch Autograd, and MLOps deployment.",
        total_weeks=12,
        progress_percent=33.3
    )
    db.add(roadmap)
    db.flush()

    milestones_data = [
        {
            "step_number": 1,
            "title": "Foundation & Numerical Matrix Computation",
            "subtitle": "Vectorized PyTorch & Autograd Mechanics",
            "description": "Deep dive into PyTorch autograd graphs, broadcasting rules, and GPU tensor memory layouts.",
            "deliverable": "Mini neural library built from scratch with custom forward and backward passes.",
            "duration": "3 Weeks",
            "status": "completed",
            "skills_acquired": ["Python Systems & Vectorization", "Machine Learning Fundamentals"],
            "resources": ["CS229 Lecture Series", "NumPy Vectorization Guide"]
        },
        {
            "step_number": 2,
            "title": "Transformer Attention Mechanisms & PEFT",
            "subtitle": "Modern LLM Fine-Tuning & Quantization",
            "description": "Implement multi-head self-attention mechanisms and low-rank adapter (LoRA) fine-tuning pipelines.",
            "deliverable": "7B parameter LLM fine-tuned on custom domain instruction corpus.",
            "duration": "3 Weeks",
            "status": "active",
            "skills_acquired": ["Deep Learning & PyTorch", "Transformers & LLMs"],
            "resources": ["Hugging Face NLP Course", "Attention Is All You Need Paper"]
        },
        {
            "step_number": 3,
            "title": "Distributed Multi-GPU Training & MLOps",
            "subtitle": "Scalable Cluster Deployment & Checkpointing",
            "description": "Configure DistributedDataParallel (DDP) across nodes and optimize checkpoint serialization latency.",
            "deliverable": "Containerized multi-node distributed training job orchestrated with Docker and SLURM.",
            "duration": "3 Weeks",
            "status": "pending",
            "skills_acquired": ["Cloud Infrastructure & MLOps", "Distributed Systems"],
            "resources": ["PyTorch DDP Tutorial", "Kubernetes for ML Engineers"]
        },
        {
            "step_number": 4,
            "title": "Production Inference Serving & Quantization",
            "subtitle": "Low-Latency Deployment with Triton & vLLM",
            "description": "Deploy quantized models to production inference servers with sub-20ms p99 token generation latencies.",
            "deliverable": "High-throughput streaming API serving vLLM inference backend.",
            "duration": "3 Weeks",
            "status": "pending",
            "skills_acquired": ["Cloud Infrastructure & MLOps", "FastAPI & Microservices"],
            "resources": ["vLLM Architecture Docs", "Triton Server Guide"]
        }
    ]
    for m in milestones_data:
        db.add(RoadmapMilestone(
            roadmap_id=roadmap.id,
            step_number=m["step_number"],
            title=m["title"],
            subtitle=m["subtitle"],
            description=m["description"],
            deliverable=m["deliverable"],
            duration=m["duration"],
            status=m["status"],
            skills_acquired=m["skills_acquired"],
            resources=m["resources"]
        ))

    # Recruiter Demo Account: recruiter@deepmind.com / recruiter123
    recruiter_user = User(
        email="recruiter@deepmind.com",
        hashed_password=get_password_hash("recruiter123"),
        role=UserRole.RECRUITER,
        is_active=True,
        is_verified=True
    )
    db.add(recruiter_user)
    db.flush()

    recruiter_profile = RecruiterProfile(
        user_id=recruiter_user.id,
        full_name="Sarah Chen",
        company_name="Google DeepMind",
        company_website="https://deepmind.google",
        company_size="1000-5000",
        industry="Artificial Intelligence & Frontier Research",
        is_verified=True
    )
    db.add(recruiter_profile)
    db.flush()

    # Recruiter 2: Stripe Recruiter
    recruiter2_user = User(
        email="recruiter@stripe.com",
        hashed_password=get_password_hash("recruiter123"),
        role=UserRole.RECRUITER,
        is_active=True,
        is_verified=True
    )
    db.add(recruiter2_user)
    db.flush()

    recruiter2_profile = RecruiterProfile(
        user_id=recruiter2_user.id,
        full_name="Marcus Vance",
        company_name="Stripe",
        company_website="https://stripe.com",
        company_size="5000+",
        industry="Fintech & Developer Platforms",
        is_verified=True
    )
    db.add(recruiter2_profile)
    db.flush()

    # Seed verified jobs
    jobs_data = [
        {
            "recruiter_id": recruiter_profile.id,
            "title": "AI Systems & Alignment Research Intern",
            "company": "Google DeepMind",
            "location": "Mountain View, CA / Hybrid",
            "workplace_type": "Hybrid",
            "employment_type": "Internship",
            "experience_level": "Intern / Student",
            "salary_range": "$65 - $85 / hr",
            "category": "AI/ML",
            "logo_color": "#A78BFA",
            "description": "Collaborate with frontier research scientists on model alignment algorithms, transformer acceleration, and empirical evaluations across synthetic domains.",
            "required_skills": ["Python Systems & Vectorization", "Deep Learning & PyTorch", "Machine Learning Fundamentals"],
            "preferred_skills": ["Transformers & LLMs", "Distributed Systems"],
            "deadline": "November 30, 2026",
            "source": "platform"
        },
        {
            "recruiter_id": recruiter2_profile.id,
            "title": "Machine Learning Platform Engineer",
            "company": "Stripe",
            "location": "San Francisco, CA / Remote",
            "workplace_type": "Remote",
            "employment_type": "Full-time",
            "experience_level": "Entry-level to 2 years",
            "salary_range": "$145,000 - $180,000",
            "category": "Engineering",
            "logo_color": "#38BDF8",
            "description": "Build high-throughput ML pipelines detecting payment fraud in real time with sub-10ms latency SLAs across global payment traffic.",
            "required_skills": ["Python Systems & Vectorization", "Cloud Infrastructure & MLOps", "SQL & Relational Databases"],
            "preferred_skills": ["Deep Learning & PyTorch", "FastAPI & Microservices"],
            "deadline": "December 15, 2026",
            "source": "platform"
        },
        {
            "recruiter_id": recruiter_profile.id,
            "title": "Frontier Model Optimization Fellow",
            "company": "Anthropic Partner Network",
            "location": "San Francisco, CA",
            "workplace_type": "Hybrid",
            "employment_type": "Internship",
            "experience_level": "Student",
            "salary_range": "$70 - $90 / hr",
            "category": "AI/ML",
            "logo_color": "#34D399",
            "description": "Focus on interpretability methods, activation pruning, and low-precision quantization techniques for large neural systems.",
            "required_skills": ["Deep Learning & PyTorch", "Transformers & LLMs", "Python Systems & Vectorization"],
            "preferred_skills": ["Cloud Infrastructure & MLOps"],
            "deadline": "Rolling Admissions",
            "source": "platform"
        },
        {
            "recruiter_id": recruiter2_profile.id,
            "title": "Full-Stack Infrastructure Engineer",
            "company": "Datadog",
            "location": "New York, NY / Remote",
            "workplace_type": "Remote",
            "employment_type": "Full-time",
            "experience_level": "Entry-level",
            "salary_range": "$130,000 - $165,000",
            "category": "Web Systems",
            "logo_color": "#FBBF24",
            "description": "Design dynamic telemetry dashboards and query services handling millions of metrics events per second.",
            "required_skills": ["TypeScript & React", "FastAPI & Microservices", "SQL & Relational Databases"],
            "preferred_skills": ["Distributed Systems"],
            "deadline": "Open",
            "source": "platform"
        }
    ]

    for j in jobs_data:
        job = Job(**j)
        db.add(job)

    db.commit()
    logger.info("Successfully seeded database with rich skills, career roles, roadmaps, learning resources, and jobs!")
