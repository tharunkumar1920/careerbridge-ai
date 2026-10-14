from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import StudentProfile
from app.models.career import CareerRole, Skill, RoleSkillRequirement
from app.schemas.career import (
    CareerRoleResponse,
    RoleSkillRequirementResponse,
    SkillResponse,
    CareerIntelligenceResponse
)
from app.services.career_intelligence import CareerIntelligenceService
from app.api.dependencies import require_student

router = APIRouter(prefix="/careers", tags=["Career Intelligence"])


@router.get("", response_model=List[CareerRoleResponse])
def get_career_roles(db: Session = Depends(get_db)):
    """List all structured career pathways."""
    roles = db.query(CareerRole).all()
    results = []
    for r in roles:
        reqs = []
        for req in r.skill_requirements:
            if req.skill:
                reqs.append(RoleSkillRequirementResponse(
                    id=req.id,
                    skill_id=req.skill_id,
                    skill_name=req.skill.name,
                    category=req.skill.category,
                    required_proficiency=req.required_proficiency,
                    importance=req.importance,
                    weight=req.weight
                ))
        results.append(CareerRoleResponse(
            id=r.id,
            title=r.title,
            slug=r.slug,
            category=r.category,
            description=r.description,
            growth_outlook=r.growth_outlook,
            avg_salary_range=r.avg_salary_range,
            requirements=reqs
        ))
    return results


@router.get("/skills/catalogue", response_model=List[SkillResponse])
def get_skill_catalogue(db: Session = Depends(get_db)):
    """Retrieve full catalogued skill database."""
    return db.query(Skill).all()


@router.get("/intelligence/me", response_model=CareerIntelligenceResponse)
def get_student_career_intelligence(
    role_slug: Optional[str] = Query(None, description="Slug of target role e.g. 'ai-ml' or 'full-stack'"),
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """
    Computes explainable, deterministic skill gap analysis, readiness score,
    and radar competency map for the authenticated student against target role.
    """
    slug = role_slug or (profile.target_role.lower().replace(" ", "-") if profile.target_role else "ai-ml")
    return CareerIntelligenceService.calculate_skill_gap_analysis(
        db=db,
        student=profile,
        target_role_slug=slug
    )


@router.get("/{slug}", response_model=CareerRoleResponse)
def get_career_role_by_slug(slug: str, db: Session = Depends(get_db)):
    """Retrieve detailed role requirements and competency targets."""
    role = db.query(CareerRole).filter(CareerRole.slug == slug).first()
    if not role:
        raise HTTPException(status_code=404, detail="Career role not found")

    reqs = []
    for req in role.skill_requirements:
        if req.skill:
            reqs.append(RoleSkillRequirementResponse(
                id=req.id,
                skill_id=req.skill_id,
                skill_name=req.skill.name,
                category=req.skill.category,
                required_proficiency=req.required_proficiency,
                importance=req.importance,
                weight=req.weight
            ))

    return CareerRoleResponse(
        id=role.id,
        title=role.title,
        slug=role.slug,
        category=role.category,
        description=role.description,
        growth_outlook=role.growth_outlook,
        avg_salary_range=role.avg_salary_range,
        requirements=reqs
    )
