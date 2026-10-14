from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import StudentProfile
from app.models.job import Job
from app.models.application import Application, ApplicationStatus
from app.schemas.application import ApplicationResponse, ApplicationCreate
from app.services.matching_engine import JobMatchingEngine
from app.api.dependencies import require_student

router = APIRouter(prefix="/applications", tags=["Applications"])


@router.get("/me", response_model=List[ApplicationResponse])
def get_my_applications(
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Retrieve all submitted job and internship applications for student."""
    return db.query(Application).filter(Application.student_id == profile.id).order_by(Application.created_at.desc()).all()


@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def apply_to_job(
    req: ApplicationCreate,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Submit application for an active job opening."""
    job = db.query(Job).filter(Job.id == req.job_id, Job.is_active == True).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found or no longer active")

    # Check duplicate application
    existing = db.query(Application).filter(
        Application.job_id == req.job_id,
        Application.student_id == profile.id
    ).first()
    if existing:
        if existing.status == ApplicationStatus.WITHDRAWN:
            # Reopen application
            existing.status = ApplicationStatus.SUBMITTED
            existing.cover_note = req.cover_note
            db.commit()
            db.refresh(existing)
            return existing
        else:
            raise HTTPException(status_code=400, detail="You have already submitted an active application for this role")

    # Calculate match score snapshot
    match_data = JobMatchingEngine.calculate_job_match(student=profile, job=job)

    app_record = Application(
        job_id=job.id,
        student_id=profile.id,
        status=ApplicationStatus.SUBMITTED,
        cover_note=req.cover_note,
        match_score_snapshot=float(match_data.match_score)
    )
    db.add(app_record)
    db.commit()
    db.refresh(app_record)
    return app_record


@router.post("/{application_id}/withdraw", response_model=ApplicationResponse)
def withdraw_application(
    application_id: int,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Withdraw a submitted application."""
    app_record = db.query(Application).filter(
        Application.id == application_id,
        Application.student_id == profile.id
    ).first()

    if not app_record:
        raise HTTPException(status_code=404, detail="Application record not found")

    if app_record.status in [ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN]:
        raise HTTPException(status_code=400, detail="Application cannot be withdrawn in its current state")

    app_record.status = ApplicationStatus.WITHDRAWN
    db.commit()
    db.refresh(app_record)
    return app_record
