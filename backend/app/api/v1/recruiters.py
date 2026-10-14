from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import RecruiterProfile, StudentProfile
from app.models.job import Job
from app.models.application import Application, ApplicationStatus
from app.schemas.profile import RecruiterProfileResponse, RecruiterProfileUpdate, StudentProfileResponse
from app.schemas.job import JobResponse, JobCreate, JobUpdate
from app.schemas.application import ApplicationResponse, ApplicationStatusUpdate
from app.services.matching_engine import JobMatchingEngine
from app.api.dependencies import require_recruiter

router = APIRouter(prefix="/recruiter", tags=["Recruiter Portal"])


@router.get("/me", response_model=RecruiterProfileResponse)
def get_recruiter_profile(profile: RecruiterProfile = Depends(require_recruiter)):
    """Retrieve authenticated recruiter's profile and company details."""
    return profile


@router.patch("/me", response_model=RecruiterProfileResponse)
def update_recruiter_profile(
    updates: RecruiterProfileUpdate,
    profile: RecruiterProfile = Depends(require_recruiter),
    db: Session = Depends(get_db)
):
    """Update company details."""
    update_data = updates.model_dump(exclude_unset=True)
    for k, v in update_data.items():
        setattr(profile, k, v)
    db.commit()
    db.refresh(profile)
    return profile


@router.get("/jobs", response_model=List[JobResponse])
def get_recruiter_jobs(
    profile: RecruiterProfile = Depends(require_recruiter),
    db: Session = Depends(get_db)
):
    """List all job openings posted by authenticated recruiter."""
    return db.query(Job).filter(Job.recruiter_id == profile.id).order_by(Job.created_at.desc()).all()


@router.post("/jobs", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job_posting(
    req: JobCreate,
    profile: RecruiterProfile = Depends(require_recruiter),
    db: Session = Depends(get_db)
):
    """Publish a new job or internship opportunity."""
    job = Job(
        recruiter_id=profile.id,
        title=req.title,
        company=profile.company_name or req.company,
        location=req.location,
        workplace_type=req.workplace_type,
        employment_type=req.employment_type,
        experience_level=req.experience_level,
        salary_range=req.salary_range,
        description=req.description,
        category=req.category,
        logo_color=req.logo_color,
        required_skills=req.required_skills,
        preferred_skills=req.preferred_skills,
        deadline=req.deadline,
        is_active=True,
        source="platform"
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.patch("/jobs/{job_id}", response_model=JobResponse)
def update_job_posting(
    job_id: int,
    req: JobUpdate,
    profile: RecruiterProfile = Depends(require_recruiter),
    db: Session = Depends(get_db)
):
    """Update or close job posting owned by authenticated recruiter."""
    job = db.query(Job).filter(Job.id == job_id, Job.recruiter_id == profile.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found or unauthorized")

    for k, v in req.model_dump(exclude_unset=True).items():
        setattr(job, k, v)

    db.commit()
    db.refresh(job)
    return job


@router.get("/jobs/{job_id}/applications", response_model=List[ApplicationResponse])
def get_applications_for_job(
    job_id: int,
    profile: RecruiterProfile = Depends(require_recruiter),
    db: Session = Depends(get_db)
):
    """Review student applications submitted for authorized job posting."""
    job = db.query(Job).filter(Job.id == job_id, Job.recruiter_id == profile.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found or unauthorized")

    return db.query(Application).filter(Application.job_id == job.id).order_by(Application.created_at.desc()).all()


@router.patch("/applications/{application_id}/status", response_model=ApplicationResponse)
def update_application_status(
    application_id: int,
    req: ApplicationStatusUpdate,
    profile: RecruiterProfile = Depends(require_recruiter),
    db: Session = Depends(get_db)
):
    """Progress application through pipeline (e.g. SHORTLISTED, INTERVIEW, OFFERED)."""
    app_record = db.query(Application).join(Job).filter(
        Application.id == application_id,
        Job.recruiter_id == profile.id
    ).first()

    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found or unauthorized")

    app_record.status = req.status
    db.commit()
    db.refresh(app_record)
    return app_record


@router.get("/candidates")
def search_eligible_candidates(
    skill: Optional[str] = Query(None),
    role: Optional[str] = Query(None),
    profile: RecruiterProfile = Depends(require_recruiter),
    db: Session = Depends(get_db)
):
    """
    Search and inspect permitted candidate profiles with explainable skill summaries.
    Does not expose sensitive private data.
    """
    students = db.query(StudentProfile).all()
    results = []

    for s in students:
        s_skills = [ss.skill.name for ss in s.skills if ss.skill]
        if skill and not any(skill.lower() in sk.lower() for sk in s_skills):
            continue
        if role and role.lower() not in (s.target_role or "").lower():
            continue

        results.append({
            "id": s.id,
            "full_name": s.full_name,
            "university": s.university,
            "degree": s.degree,
            "target_role": s.target_role,
            "career_readiness_score": s.career_readiness_score,
            "skills": s_skills,
            "projects_count": len(s.projects),
            "location": s.location,
            "bio": s.bio
        })

    return results
