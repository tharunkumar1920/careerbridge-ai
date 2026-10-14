from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.profile import StudentProfile
from app.models.career import CareerRole, Skill, StudentSkill
from app.models.roadmap import Roadmap, RoadmapMilestone
from app.models.learning import LearningResource


class RoadmapService:
    @staticmethod
    def get_or_create_student_roadmap(
        db: Session,
        student: StudentProfile,
        target_role: Optional[str] = None
    ) -> Roadmap:
        """Fetch existing roadmap or generate new structured roadmap based on student gaps."""
        role_title = target_role or student.target_role or "AI / Machine Learning Engineer"

        existing = db.query(Roadmap).filter(
            Roadmap.student_id == student.id,
            Roadmap.target_role == role_title
        ).first()

        if existing:
            return existing

        # Generate new tailored roadmap
        roadmap = Roadmap(
            student_id=student.id,
            target_role=role_title,
            title=f"Personalized {role_title} Mastery Roadmap",
            description=f"Actionable 12-week roadmap tailored for {student.full_name} to achieve top-tier competency in {role_title}.",
            total_weeks=12,
            progress_percent=0.0
        )
        db.add(roadmap)
        db.flush()

        # Find learning resources matching relevant skills
        resources = db.query(LearningResource).all()
        res_titles = [r.title for r in resources[:4]]

        milestones_template = [
            {
                "step_number": 1,
                "title": "Core Theoretical & Mathematical Foundations",
                "subtitle": "Algorithmic Complexity & Numerical Systems",
                "description": "Solidify deep understanding of vector transformations, numerical stability, and optimization landscapes.",
                "deliverable": "Working numerical pipeline benchmarking CPU vectorization vs GPU matrix tensors.",
                "duration": "3 Weeks",
                "skills": ["Python Systems & Vectorization", "Machine Learning Fundamentals"],
                "resources": [res_titles[0] if len(res_titles) > 0 else "Foundational ML Course"]
            },
            {
                "step_number": 2,
                "title": "Architectural Deep Dive & Neural Implementations",
                "subtitle": "Attention Mechanisms & Tensor Modeling",
                "description": "Construct neural architectures with custom backward hooks, learning rate schedulers, and gradient clipping.",
                "deliverable": "End-to-end trained model repository with full experiment tracking and loss curves.",
                "duration": "3 Weeks",
                "skills": ["Deep Learning & PyTorch", "Transformers & LLMs"],
                "resources": [res_titles[1] if len(res_titles) > 1 else "PyTorch Deep Dive Tutorials"]
            },
            {
                "step_number": 3,
                "title": "Distributed Scaling & Production MLOps",
                "subtitle": "Containerization & Inference Acceleration",
                "description": "Package inference pipelines inside Docker containers, optimize quantization to 4-bit/8-bit precision, and profile latency.",
                "deliverable": "Containerized service benchmarked under simulated 1,000 req/sec concurrent load.",
                "duration": "3 Weeks",
                "skills": ["Cloud Infrastructure & MLOps", "FastAPI & Microservices"],
                "resources": [res_titles[2] if len(res_titles) > 2 else "MLOps Containerization Guide"]
            },
            {
                "step_number": 4,
                "title": "Capstone Engineering & Portfolio Proof",
                "subtitle": "Public Deployment & Technical Defense",
                "description": "Synthesize all acquired competencies into a public-facing, documented software artifact with live demonstration.",
                "deliverable": "Production application live URL with GitHub technical architecture README.",
                "duration": "3 Weeks",
                "skills": ["Data Structures & Algorithms", "TypeScript & React"],
                "resources": [res_titles[3] if len(res_titles) > 3 else "Full Stack Systems Blueprint"]
            }
        ]

        for idx, m_data in enumerate(milestones_template):
            milestone = RoadmapMilestone(
                roadmap_id=roadmap.id,
                step_number=m_data["step_number"],
                title=m_data["title"],
                subtitle=m_data["subtitle"],
                description=m_data["description"],
                deliverable=m_data["deliverable"],
                duration=m_data["duration"],
                status="active" if idx == 0 else "pending",
                skills_acquired=m_data["skills"],
                resources=m_data["resources"]
            )
            db.add(milestone)

        db.commit()
        db.refresh(roadmap)
        return roadmap

    @staticmethod
    def update_milestone_status(
        db: Session,
        roadmap_id: int,
        milestone_id: int,
        student_id: int,
        new_status: str
    ) -> Roadmap:
        """Update a milestone's progress and recalculate the roadmap's total completion percentage."""
        milestone = db.query(RoadmapMilestone).join(Roadmap).filter(
            RoadmapMilestone.id == milestone_id,
            Roadmap.id == roadmap_id,
            Roadmap.student_id == student_id
        ).first()

        if not milestone:
            raise ValueError("Milestone not found or unauthorized")

        milestone.status = new_status
        if new_status == "completed":
            milestone.completed_at = datetime.now(timezone.utc)
        else:
            milestone.completed_at = None

        db.flush()

        # Recalculate roadmap progress
        all_milestones = db.query(RoadmapMilestone).filter(
            RoadmapMilestone.roadmap_id == roadmap_id
        ).all()

        total = len(all_milestones)
        completed = sum(1 for m in all_milestones if m.status == "completed")

        roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
        if roadmap and total > 0:
            roadmap.progress_percent = round((completed / total) * 100.0, 1)

        db.commit()
        db.refresh(roadmap)
        return roadmap
