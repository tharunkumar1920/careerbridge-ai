from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class MilestoneUpdate(BaseModel):
    status: str = Field(..., pattern="^(pending|active|completed)$")


class MilestoneResponse(BaseModel):
    id: int
    step_number: int
    title: str
    subtitle: Optional[str] = None
    description: str
    deliverable: Optional[str] = None
    duration: str
    status: str
    skills_acquired: List[str] = []
    resources: List[str] = []
    completed_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class RoadmapResponse(BaseModel):
    id: int
    student_id: int
    target_role: str
    title: str
    description: Optional[str] = None
    total_weeks: int
    progress_percent: float
    milestones: List[MilestoneResponse] = []
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class GenerateRoadmapRequest(BaseModel):
    target_role: str
    available_hours_per_week: Optional[int] = 15
    learning_style: Optional[str] = "project-based"
