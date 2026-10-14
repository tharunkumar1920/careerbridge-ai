from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, HttpUrl, ConfigDict


class LearningResourceResponse(BaseModel):
    id: int
    title: str
    description: str
    topic: str
    skill_name: str
    resource_type: str
    provider: str
    url: str
    difficulty: str
    duration_hours: int
    rating: float
    tags: List[str] = []

    model_config = ConfigDict(from_attributes=True)


class StudentProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str] = []
    skills_demonstrated: List[str] = []
    repo_url: Optional[str] = None
    demo_url: Optional[str] = None
    status: str = "completed"


class StudentProjectResponse(BaseModel):
    id: int
    student_id: int
    title: str
    description: str
    technologies: List[str] = []
    skills_demonstrated: List[str] = []
    repo_url: Optional[str] = None
    demo_url: Optional[str] = None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
