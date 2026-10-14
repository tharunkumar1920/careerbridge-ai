from typing import Optional
from sqlalchemy import String, Integer, Text, ForeignKey, Float, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin


class Resume(Base, TimestampMixin):
    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False, index=True)

    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)
    parsed_skills: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    analysis_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    target_role: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    feedback_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)

    # Relationships
    student = relationship("StudentProfile", back_populates="resumes")
