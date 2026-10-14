import os
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import StudentProfile
from app.models.resume import Resume
from app.schemas.resume import ResumeAnalysisResponse
from app.services.resume_service import ResumeService
from app.api.dependencies import require_student

router = APIRouter(prefix="/resumes", tags=["Resume Intelligence"])

ALLOWED_EXTENSIONS = {".pdf", ".txt", ".docx"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post("/upload", response_model=ResumeAnalysisResponse)
async def upload_and_analyze_resume(
    file: UploadFile = File(...),
    target_role: Optional[str] = Form("ai-ml"),
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """
    Safely extract text from PDF/TXT resume, analyze against target role requirements,
    and generate structured improvements and parsed skills.
    """
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Please upload a PDF or TXT resume."
        )

    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds maximum 10MB limit")

    raw_text = ResumeService.extract_text_from_pdf_or_text(file_bytes, file.filename)
    if not raw_text.strip():
        raise HTTPException(status_code=400, detail="Unable to extract readable text from document")

    # Run analysis
    analysis = ResumeService.analyze_resume_text(
        db=db,
        resume_text=raw_text,
        target_role_slug=target_role
    )

    # Save to database
    resume_record = Resume(
        student_id=profile.id,
        filename=file.filename,
        file_path="virtual_storage",
        file_size_bytes=len(file_bytes),
        raw_text=raw_text,
        parsed_skills=analysis["parsed_skills"],
        analysis_score=float(analysis["score"]),
        target_role=target_role,
        feedback_json=analysis
    )
    db.add(resume_record)
    db.commit()
    db.refresh(resume_record)

    return ResumeAnalysisResponse(
        id=resume_record.id,
        filename=resume_record.filename,
        file_size_bytes=resume_record.file_size_bytes,
        analysis_score=resume_record.analysis_score,
        target_role=resume_record.target_role,
        extracted_text_preview=analysis["preview"],
        parsed_skills=analysis["parsed_skills"],
        missing_critical_skills=analysis["missing_critical_skills"],
        formatting_issues=analysis["formatting_issues"],
        actionable_improvements=analysis["actionable_improvements"],
        impact_enhancement_suggestions=analysis["impact_suggestions"],
        created_at=resume_record.created_at
    )


@router.get("/me", response_model=Optional[ResumeAnalysisResponse])
def get_my_latest_resume(
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Retrieve the latest resume analysis for student."""
    resume_record = db.query(Resume).filter(
        Resume.student_id == profile.id
    ).order_by(Resume.created_at.desc()).first()

    if not resume_record:
        return None

    analysis = resume_record.feedback_json or {}
    return ResumeAnalysisResponse(
        id=resume_record.id,
        filename=resume_record.filename,
        file_size_bytes=resume_record.file_size_bytes,
        analysis_score=resume_record.analysis_score,
        target_role=resume_record.target_role,
        extracted_text_preview=analysis.get("preview", resume_record.raw_text[:400]),
        parsed_skills=resume_record.parsed_skills,
        missing_critical_skills=analysis.get("missing_critical_skills", []),
        formatting_issues=analysis.get("formatting_issues", []),
        actionable_improvements=analysis.get("actionable_improvements", []),
        impact_enhancement_suggestions=analysis.get("impact_suggestions", []),
        created_at=resume_record.created_at
    )
