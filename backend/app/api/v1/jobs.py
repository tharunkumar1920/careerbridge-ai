from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import StudentProfile
from app.models.job import Job, SavedJob
from app.schemas.job import JobResponse, JobMatchResponse
from app.services.matching_engine import JobMatchingEngine
from app.api.dependencies import require_student

router = APIRouter(prefix="/jobs", tags=["Jobs & Opportunities"])


@router.get("", response_model=List[JobResponse])
def get_public_jobs(
    category: Optional[str] = Query(None),
    workplace: Optional[str] = Query(None),
    keyword: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Public opportunity discovery for active platform listings."""
    query = db.query(Job).filter(Job.is_active == True)
    if category:
        query = query.filter(Job.category.ilike(f"%{category}%"))
    if workplace:
        query = query.filter(Job.workplace_type.ilike(f"%{workplace}%"))
    if keyword:
        query = query.filter(
            (Job.title.ilike(f"%{keyword}%")) |
            (Job.company.ilike(f"%{keyword}%")) |
            (Job.description.ilike(f"%{keyword}%"))
        )
    return query.all()


@router.get("/matched", response_model=List[JobMatchResponse])
def get_matched_jobs_for_student(
    category: Optional[str] = Query(None),
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """
    Returns explainable match rankings tailored to authenticated student's
    competencies and project evidence.
    """
    return JobMatchingEngine.match_opportunities_for_student(
        db=db,
        student=profile,
        category=category
    )


@router.get("/saved/me", response_model=List[JobResponse])
def get_saved_jobs(
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Retrieve bookmarked opportunities for student."""
    saved_entries = db.query(SavedJob).filter(SavedJob.student_id == profile.id).all()
    return [entry.job for entry in saved_entries if entry.job]


@router.get("/{job_id}", response_model=JobResponse)
def get_job_by_id(job_id: int, db: Session = Depends(get_db)):
    """Retrieve single job details."""
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found")
    return job


@router.post("/{job_id}/save")
def toggle_save_job(
    job_id: int,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Bookmark or toggle save opportunity for student."""
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing = db.query(SavedJob).filter(
        SavedJob.student_id == profile.id,
        SavedJob.job_id == job_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"saved": False, "message": "Job removed from saved list"}
    else:
        new_save = SavedJob(student_id=profile.id, job_id=job_id)
        db.add(new_save)
        db.commit()
        return {"saved": True, "message": "Job saved successfully"}
