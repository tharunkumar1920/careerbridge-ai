from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class JobCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    company: str = Field(..., min_length=2, max_length=200)
    location: str = "San Francisco, CA / Remote"
    workplace_type: str = "Hybrid"
    employment_type: str = "Full-time"
    experience_level: str = "Entry-level"
    salary_range: str = "$120k - $160k"
    description: str = Field(..., min_length=20)
    category: str = "AI/ML"
    logo_color: str = "#A78BFA"
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    deadline: Optional[str] = None


class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    workplace_type: Optional[str] = None
    employment_type: Optional[str] = None
    experience_level: Optional[str] = None
    salary_range: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    logo_color: Optional[str] = None
    required_skills: Optional[List[str]] = None
    preferred_skills: Optional[List[str]] = None
    deadline: Optional[str] = None
    is_active: Optional[bool] = None


class JobResponse(BaseModel):
    id: int
    recruiter_id: Optional[int] = None
    title: str
    company: str
    location: str
    workplace_type: str
    employment_type: str
    experience_level: str
    salary_range: str
    description: str
    category: str
    logo_color: str
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    deadline: Optional[str] = None
    is_active: bool
    source: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class JobMatchResponse(BaseModel):
    job: JobResponse
    match_score: int  # 0 to 100 explainable score
    matched_skills: List[str]
    missing_critical_skills: List[str]
    recommended_to_learn: List[str]
    why_match: str
    eligibility_note: str
    is_saved: bool = False
    has_applied: bool = False
