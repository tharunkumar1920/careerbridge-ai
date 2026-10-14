from typing import Optional, List
from sqlalchemy import String, Integer, Text, ForeignKey, Float, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin


class LearningResource(Base, TimestampMixin):
    __tablename__ = "learning_resources"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    topic: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    skill_name: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    resource_type: Mapped[str] = mapped_column(String(50), default="course", nullable=False)  # course, tutorial, docs, project, book
    provider: Mapped[str] = mapped_column(String(100), nullable=False)  # Coursera, DeepLearning.AI, Harvard, Fast.ai, Docs
    url: Mapped[str] = mapped_column(String(500), nullable=False)
    difficulty: Mapped[str] = mapped_column(String(50), default="Intermediate", nullable=False)  # Beginner, Intermediate, Advanced
    duration_hours: Mapped[int] = mapped_column(Integer, default=10, nullable=False)
    rating: Mapped[float] = mapped_column(Float, default=4.8, nullable=False)
    tags: Mapped[list] = mapped_column(JSON, default=list, nullable=False)


class StudentProject(Base, TimestampMixin):
    __tablename__ = "student_projects"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False, index=True)

    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    technologies: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    skills_demonstrated: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    repo_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    demo_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="completed", nullable=False)  # in_progress, completed

    # Relationships
    student = relationship("StudentProfile", back_populates="projects")
