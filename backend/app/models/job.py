from datetime import datetime, timezone
from typing import Optional, List
from sqlalchemy import String, Integer, Text, ForeignKey, Boolean, DateTime, JSON, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin


class Job(Base, TimestampMixin):
    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    recruiter_id: Mapped[Optional[int]] = mapped_column(ForeignKey("recruiter_profiles.id", ondelete="SET NULL"), nullable=True, index=True)

    title: Mapped[str] = mapped_column(String(200), index=True, nullable=False)
    company: Mapped[str] = mapped_column(String(200), index=True, nullable=False)
    location: Mapped[str] = mapped_column(String(150), default="San Francisco, CA / Remote", nullable=False)
    workplace_type: Mapped[str] = mapped_column(String(50), default="Hybrid", nullable=False)  # Remote, Hybrid, On-site
    employment_type: Mapped[str] = mapped_column(String(50), default="Full-time", nullable=False)  # Full-time, Internship, Contract
    experience_level: Mapped[str] = mapped_column(String(50), default="Entry-level", nullable=False)
    salary_range: Mapped[str] = mapped_column(String(100), default="$120k - $150k", nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(100), default="AI/ML", index=True, nullable=False)
    logo_color: Mapped[str] = mapped_column(String(50), default="#A78BFA", nullable=False)

    required_skills: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    preferred_skills: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    deadline: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    source: Mapped[str] = mapped_column(String(50), default="platform", nullable=False)  # platform, partner

    # Relationships
    recruiter = relationship("RecruiterProfile", back_populates="jobs")
    applications = relationship("Application", back_populates="job", cascade="all, delete-orphan")
    saved_by = relationship("SavedJob", back_populates="job", cascade="all, delete-orphan")


class SavedJob(Base, TimestampMixin):
    __tablename__ = "saved_jobs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False, index=True)

    __table_args__ = (
        UniqueConstraint('student_id', 'job_id', name='uq_student_saved_job'),
    )

    # Relationships
    student = relationship("StudentProfile", back_populates="saved_jobs")
    job = relationship("Job", back_populates="saved_by")
