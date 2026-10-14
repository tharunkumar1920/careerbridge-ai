from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class StudentProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    university: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    academic_year: Optional[str] = None
    graduation_year: Optional[int] = None
    location: Optional[str] = None
    target_role: Optional[str] = None
    bio: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    linkedin_url: Optional[str] = None


class StudentProfileResponse(BaseModel):
    id: int
    user_id: int
    full_name: str
    avatar_url: Optional[str] = None
    university: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    academic_year: Optional[str] = None
    graduation_year: Optional[int] = None
    location: Optional[str] = None
    target_role: Optional[str] = None
    bio: Optional[str] = None
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    career_readiness_score: float
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RecruiterProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    company_name: Optional[str] = None
    company_website: Optional[str] = None
    company_logo: Optional[str] = None
    company_size: Optional[str] = None
    industry: Optional[str] = None


class RecruiterProfileResponse(BaseModel):
    id: int
    user_id: int
    full_name: str
    company_name: str
    company_website: Optional[str] = None
    company_logo: Optional[str] = None
    company_size: Optional[str] = None
    industry: Optional[str] = None
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
