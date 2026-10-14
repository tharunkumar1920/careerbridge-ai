from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict


class AssistantMessageRequest(BaseModel):
    message: str = Field(..., min_length=1)
    conversation_id: Optional[int] = None


class StructuredAssistantPayload(BaseModel):
    target_role: Optional[str] = None
    strengths: List[str] = []
    skill_gaps: List[str] = []
    recommended_actions: List[str] = []
    suggested_opportunities: List[str] = []
    explanation: str = ""


class AssistantMessageResponse(BaseModel):
    id: int
    conversation_id: int
    role: str
    content: str
    structured_data: Optional[Dict[str, Any]] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    messages: List[AssistantMessageResponse] = []

    model_config = ConfigDict(from_attributes=True)
