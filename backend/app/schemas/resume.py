from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict


class ResumeAnalysisResponse(BaseModel):
    id: int
    filename: str
    file_size_bytes: int
    analysis_score: float  # 0 to 100
    target_role: Optional[str] = None
    extracted_text_preview: str
    parsed_skills: List[str]
    missing_critical_skills: List[str]
    formatting_issues: List[str]
    actionable_improvements: List[str]
    impact_enhancement_suggestions: List[Dict[str, str]]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
