from datetime import datetime, timezone
from typing import Optional, List
from sqlalchemy import String, Integer, Text, ForeignKey, Float, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin


class Roadmap(Base, TimestampMixin):
    __tablename__ = "roadmaps"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False, index=True)

    target_role: Mapped[str] = mapped_column(String(150), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    total_weeks: Mapped[int] = mapped_column(Integer, default=12, nullable=False)
    progress_percent: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)

    # Relationships
    student = relationship("StudentProfile", back_populates="roadmaps")
    milestones = relationship("RoadmapMilestone", back_populates="roadmap", cascade="all, delete-orphan", order_by="RoadmapMilestone.step_number")


class RoadmapMilestone(Base, TimestampMixin):
    __tablename__ = "roadmap_milestones"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    roadmap_id: Mapped[int] = mapped_column(ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False, index=True)

    step_number: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    subtitle: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    deliverable: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    duration: Mapped[str] = mapped_column(String(50), default="2 weeks", nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)  # pending, active, completed
    skills_acquired: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    resources: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    roadmap = relationship("Roadmap", back_populates="milestones")
