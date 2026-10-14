from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import StudentProfile
from app.models.interview import InterviewSession, InterviewQuestion
from app.schemas.interview import (
    InterviewStartRequest,
    InterviewAnswerSubmit,
    InterviewSessionResponse,
    InterviewQuestionResponse
)
from app.services.interview_service import InterviewService
from app.api.dependencies import require_student

router = APIRouter(prefix="/interviews", tags=["Mock Interview Preparation"])


@router.post("/start", response_model=InterviewSessionResponse, status_code=status.HTTP_201_CREATED)
def start_interview_session(
    req: InterviewStartRequest,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Launch a new role-tailored technical or behavioral mock interview."""
    session = InterviewService.start_session(
        db=db,
        student_id=profile.id,
        req=req
    )
    return session


@router.post("/questions/{question_id}/answer", response_model=InterviewQuestionResponse)
def submit_interview_answer(
    question_id: int,
    req: InterviewAnswerSubmit,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """
    Submit written answer and receive instant evaluation against structured rubric criteria.
    """
    question = db.query(InterviewQuestion).join(InterviewSession).filter(
        InterviewQuestion.id == question_id,
        InterviewSession.student_id == profile.id
    ).first()

    if not question:
        raise HTTPException(status_code=404, detail="Interview question not found or unauthorized")

    evaluated_q = InterviewService.evaluate_answer(
        db=db,
        question=question,
        answer_text=req.student_answer
    )
    return evaluated_q


@router.get("/history", response_model=List[InterviewSessionResponse])
def get_interview_history(
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Retrieve student's mock interview practice sessions."""
    return db.query(InterviewSession).filter(
        InterviewSession.student_id == profile.id
    ).order_by(InterviewSession.created_at.desc()).all()


@router.get("/{session_id}", response_model=InterviewSessionResponse)
def get_interview_session(
    session_id: int,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Retrieve details and feedback for a specific session."""
    session = db.query(InterviewSession).filter(
        InterviewSession.id == session_id,
        InterviewSession.student_id == profile.id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="Interview session not found")

    return session
