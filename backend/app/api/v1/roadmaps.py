from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import StudentProfile
from app.schemas.roadmap import RoadmapResponse, MilestoneUpdate, GenerateRoadmapRequest
from app.services.roadmap_service import RoadmapService
from app.api.dependencies import require_student

router = APIRouter(prefix="/roadmaps", tags=["Learning Roadmaps"])


@router.get("/me", response_model=RoadmapResponse)
def get_student_roadmap(
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Retrieve authenticated student's personalized learning roadmap."""
    roadmap = RoadmapService.get_or_create_student_roadmap(
        db=db,
        student=profile,
        target_role=profile.target_role
    )
    return roadmap


@router.post("/generate", response_model=RoadmapResponse)
def generate_new_roadmap(
    req: GenerateRoadmapRequest,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Generate or refresh learning roadmap for specified target career role."""
    roadmap = RoadmapService.get_or_create_student_roadmap(
        db=db,
        student=profile,
        target_role=req.target_role
    )
    return roadmap


@router.patch("/{roadmap_id}/milestones/{milestone_id}", response_model=RoadmapResponse)
def update_milestone_progress(
    roadmap_id: int,
    milestone_id: int,
    update: MilestoneUpdate,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """
    Mark milestone as completed, active, or pending.
    Updates database and recalculates roadmap total completion percentage.
    """
    try:
        updated_roadmap = RoadmapService.update_milestone_status(
            db=db,
            roadmap_id=roadmap_id,
            milestone_id=milestone_id,
            student_id=profile.id,
            new_status=update.status
        )
        return updated_roadmap
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
