from typing import Optional, List
from sqlalchemy import String, Integer, Text, ForeignKey, Float, Boolean, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin


class Skill(Base, TimestampMixin):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    category: Mapped[str] = mapped_column(String(50), index=True, nullable=False)  # Languages, AI/ML, Web, Data, Cloud, Tools
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    student_skills = relationship("StudentSkill", back_populates="skill", cascade="all, delete-orphan")
    role_requirements = relationship("RoleSkillRequirement", back_populates="skill", cascade="all, delete-orphan")


class StudentSkill(Base, TimestampMixin):
    __tablename__ = "student_skills"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("student_profiles.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_id: Mapped[int] = mapped_column(ForeignKey("skills.id", ondelete="CASCADE"), nullable=False, index=True)

    proficiency: Mapped[int] = mapped_column(Integer, default=1, nullable=False)  # 1 to 5 (or 0-100 mapped)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    source: Mapped[str] = mapped_column(String(50), default="self_reported", nullable=False)  # self_reported, assessment, project_evidence

    __table_args__ = (
        UniqueConstraint('student_id', 'skill_id', name='uq_student_skill'),
    )

    # Relationships
    student = relationship("StudentProfile", back_populates="skills")
    skill = relationship("Skill", back_populates="student_skills")


class CareerRole(Base, TimestampMixin):
    __tablename__ = "career_roles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(150), unique=True, index=True, nullable=False)
    category: Mapped[str] = mapped_column(String(100), index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    growth_outlook: Mapped[str] = mapped_column(String(100), default="High (+28% by 2028)", nullable=False)
    avg_salary_range: Mapped[str] = mapped_column(String(100), default="$110k - $160k", nullable=False)

    # Relationships
    skill_requirements = relationship("RoleSkillRequirement", back_populates="career_role", cascade="all, delete-orphan")


class RoleSkillRequirement(Base, TimestampMixin):
    __tablename__ = "role_skill_requirements"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    role_id: Mapped[int] = mapped_column(ForeignKey("career_roles.id", ondelete="CASCADE"), nullable=False, index=True)
    skill_id: Mapped[int] = mapped_column(ForeignKey("skills.id", ondelete="CASCADE"), nullable=False, index=True)

    required_proficiency: Mapped[int] = mapped_column(Integer, default=3, nullable=False)  # 1 to 5
    importance: Mapped[str] = mapped_column(String(50), default="critical", nullable=False)  # critical, recommended, optional
    weight: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)

    __table_args__ = (
        UniqueConstraint('role_id', 'skill_id', name='uq_role_skill'),
    )

    # Relationships
    career_role = relationship("CareerRole", back_populates="skill_requirements")
    skill = relationship("Skill", back_populates="role_requirements")
