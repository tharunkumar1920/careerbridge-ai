from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.models.application import ApplicationStatus
from app.schemas.job import JobResponse
from app.schemas.profile import StudentProfileResponse


class ApplicationCreate(BaseModel):
    job_id: int
    cover_note: Optional[str] = None


class ApplicationStatusUpdate(BaseModel):
    status: ApplicationStatus


class ApplicationResponse(BaseModel):
    id: int
    job_id: int
    student_id: int
    status: ApplicationStatus
    cover_note: Optional[str] = None
    match_score_snapshot: float
    created_at: datetime
    updated_at: datetime
    job: Optional[JobResponse] = None
    student: Optional[StudentProfileResponse] = None

    model_config = ConfigDict(from_attributes=True)
