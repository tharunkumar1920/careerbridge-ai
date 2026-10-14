from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class SkillBase(BaseModel):
    name: str
    category: str
    description: Optional[str] = None


class SkillResponse(SkillBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class StudentSkillCreate(BaseModel):
    skill_name: str
    proficiency: int = Field(..., ge=1, le=5)
    source: str = "self_reported"


class StudentSkillResponse(BaseModel):
    id: int
    skill_id: int
    name: str
    category: str
    proficiency: int
    is_verified: bool
    source: str

    model_config = ConfigDict(from_attributes=True)


class RoleSkillRequirementResponse(BaseModel):
    id: int
    skill_id: int
    skill_name: str
    category: str
    required_proficiency: int
    importance: str
    weight: float


class CareerRoleResponse(BaseModel):
    id: int
    title: str
    slug: str
    category: str
    description: str
    growth_outlook: str
    avg_salary_range: str
    requirements: List[RoleSkillRequirementResponse] = []

    model_config = ConfigDict(from_attributes=True)


class SkillGapItem(BaseModel):
    name: str
    category: str
    current: int  # 0 to 100
    required: int  # 0 to 100
    gap: int
    status: str  # optimal, moderate, critical
    priority: str  # High, Medium, Low
    importance: str  # critical, recommended, optional
    is_verified: bool
    evidence_source: str
    recommendation: str


class RadarAxisItem(BaseModel):
    axis: str
    current: int
    required: int
    cohort: int


class CareerIntelligenceResponse(BaseModel):
    target_role: str
    alignment_score: float  # Transparently computed 0-100%
    confidence_score: float
    market_demand_trend: str
    projected_timeline: str
    verified_strengths: List[str]
    critical_gaps: List[SkillGapItem]
    radar_axes: List[RadarAxisItem]
    explanation: str
    calculation_basis: str
