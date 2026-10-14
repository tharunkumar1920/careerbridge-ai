from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class InterviewStartRequest(BaseModel):
    target_role: str = "AI / Machine Learning Engineer"
    category: str = "technical"  # technical, behavioral, system_design
    difficulty: str = "intermediate"  # beginner, intermediate, advanced


class InterviewAnswerSubmit(BaseModel):
    question_id: int
    student_answer: str = Field(..., min_length=10)


class InterviewQuestionResponse(BaseModel):
    id: int
    session_id: int
    question_text: str
    category: str
    student_answer: Optional[str] = None
    score: float
    strengths: List[str] = []
    improvements: List[str] = []
    model_answer: Optional[str] = None
    rubric_criteria: List[str] = []

    model_config = ConfigDict(from_attributes=True)


class InterviewSessionResponse(BaseModel):
    id: int
    target_role: str
    category: str
    difficulty: str
    status: str
    overall_score: float
    feedback_summary: Optional[str] = None
    questions: List[InterviewQuestionResponse] = []
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
