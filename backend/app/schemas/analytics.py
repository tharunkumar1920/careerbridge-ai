from typing import List, Dict, Any
from pydantic import BaseModel


class SkillDemandItem(BaseModel):
    skill_name: str
    frequency_in_postings: int
    percentage: float
    growth_yoy: str
    category: str


class RoleDemandItem(BaseModel):
    role_name: str
    active_postings_sample: int
    median_intern_stipend: str
    median_grad_salary: str
    demand_index: int


class PlatformAnalyticsResponse(BaseModel):
    data_source: str
    observation_period: str
    dataset_size_note: str
    top_skills_demand: List[SkillDemandItem]
    top_roles_demand: List[RoleDemandItem]
    summary_insight: str
