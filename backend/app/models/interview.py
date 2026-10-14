from typing import Optional
from sqlalchemy import String, Integer, Text, ForeignKey, Float, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin


class InterviewSession(Base, TimestampMixin):
    __tablename__ = "interview_sessions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False, index=True)

    target_role: Mapped[str] = mapped_column(String(150), default="AI/ML Engineer", nullable=False)
    category: Mapped[str] = mapped_column(String(50), default="technical", nullable=False)  # technical, behavioral, system_design
    difficulty: Mapped[str] = mapped_column(String(50), default="intermediate", nullable=False)  # beginner, intermediate, advanced
    status: Mapped[str] = mapped_column(String(50), default="in_progress", nullable=False)  # in_progress, completed
    overall_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    feedback_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    student = relationship("StudentProfile", back_populates="interview_sessions")
    questions = relationship("InterviewQuestion", back_populates="session", cascade="all, delete-orphan", order_by="InterviewQuestion.id")


class InterviewQuestion(Base, TimestampMixin):
    __tablename__ = "interview_questions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    session_id: Mapped[int] = mapped_column(ForeignKey("interview_sessions.id", ondelete="CASCADE"), nullable=False, index=True)

    question_text: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(50), default="technical", nullable=False)
    student_answer: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    rubric_criteria: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    strengths: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    improvements: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    model_answer: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    session = relationship("InterviewSession", back_populates="questions")
