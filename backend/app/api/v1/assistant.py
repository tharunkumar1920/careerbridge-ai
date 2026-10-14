from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.models.assistant import AssistantConversation
from app.schemas.assistant import (
    AssistantMessageRequest,
    AssistantMessageResponse,
    ConversationResponse
)
from app.services.assistant_service import AssistantService
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/assistant", tags=["AI Career Assistant"])


@router.post("/chat", response_model=AssistantMessageResponse)
def send_chat_message(
    req: AssistantMessageRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Send question to Career Assistant. Contextually grounded in student profile
    and platform opportunity database.
    """
    return AssistantService.process_message(
        db=db,
        user=current_user,
        message_text=req.message,
        conversation_id=req.conversation_id
    )


@router.get("/conversations", response_model=List[ConversationResponse])
def get_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """List prior assistant conversation sessions."""
    return db.query(AssistantConversation).filter(
        AssistantConversation.user_id == current_user.id
    ).order_by(AssistantConversation.created_at.desc()).all()


@router.get("/conversations/{conversation_id}", response_model=ConversationResponse)
def get_conversation_history(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve full messages for a conversation session."""
    convo = db.query(AssistantConversation).filter(
        AssistantConversation.id == conversation_id,
        AssistantConversation.user_id == current_user.id
    ).first()

    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")

    return convo
