from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.profile import StudentProfile
from app.models.career import Skill, StudentSkill
from app.models.learning import StudentProject
from app.schemas.profile import StudentProfileResponse, StudentProfileUpdate
from app.schemas.career import StudentSkillResponse, StudentSkillCreate
from app.schemas.learning import StudentProjectResponse, StudentProjectCreate
from app.api.dependencies import require_student

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/me", response_model=StudentProfileResponse)
def get_student_profile(profile: StudentProfile = Depends(require_student)):
    """Retrieve authenticated student's profile."""
    return profile


@router.patch("/me", response_model=StudentProfileResponse)
def update_student_profile(
    updates: StudentProfileUpdate,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Update profile fields (university, target role, bio, links)."""
    update_data = updates.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile


@router.get("/me/skills", response_model=List[StudentSkillResponse])
def get_student_skills(profile: StudentProfile = Depends(require_student)):
    """Retrieve student's associated skills."""
    res = []
    for ss in profile.skills:
        if ss.skill:
            res.append(StudentSkillResponse(
                id=ss.id,
                skill_id=ss.skill_id,
                name=ss.skill.name,
                category=ss.skill.category,
                proficiency=ss.proficiency,
                is_verified=ss.is_verified,
                source=ss.source
            ))
    return res


@router.post("/me/skills", response_model=StudentSkillResponse)
def add_or_update_student_skill(
    skill_req: StudentSkillCreate,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Add or update proficiency for a skill on the student's profile."""
    # Find or create skill in catalogue
    skill = db.query(Skill).filter(Skill.name.ilike(skill_req.skill_name.strip())).first()
    if not skill:
        skill = Skill(name=skill_req.skill_name.strip(), category="General Competency")
        db.add(skill)
        db.flush()

    # Check if student already has this skill
    student_skill = db.query(StudentSkill).filter(
        StudentSkill.student_id == profile.id,
        StudentSkill.skill_id == skill.id
    ).first()

    if student_skill:
        student_skill.proficiency = skill_req.proficiency
        student_skill.source = skill_req.source
    else:
        student_skill = StudentSkill(
            student_id=profile.id,
            skill_id=skill.id,
            proficiency=skill_req.proficiency,
            is_verified=False,
            source=skill_req.source
        )
        db.add(student_skill)

    db.commit()
    db.refresh(student_skill)

    return StudentSkillResponse(
        id=student_skill.id,
        skill_id=skill.id,
        name=skill.name,
        category=skill.category,
        proficiency=student_skill.proficiency,
        is_verified=student_skill.is_verified,
        source=student_skill.source
    )


@router.delete("/me/skills/{skill_id}")
def delete_student_skill(
    skill_id: int,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Remove a skill from student profile."""
    student_skill = db.query(StudentSkill).filter(
        StudentSkill.student_id == profile.id,
        StudentSkill.skill_id == skill_id
    ).first()

    if not student_skill:
        raise HTTPException(status_code=404, detail="Skill not found on profile")

    db.delete(student_skill)
    db.commit()
    return {"message": "Skill removed successfully"}


@router.get("/me/projects", response_model=List[StudentProjectResponse])
def get_student_projects(profile: StudentProfile = Depends(require_student)):
    """Retrieve projects demonstrating verified technical skills."""
    return profile.projects


@router.post("/me/projects", response_model=StudentProjectResponse, status_code=status.HTTP_201_CREATED)
def add_student_project(
    proj: StudentProjectCreate,
    profile: StudentProfile = Depends(require_student),
    db: Session = Depends(get_db)
):
    """Record a completed technical project."""
    new_proj = StudentProject(
        student_id=profile.id,
        title=proj.title,
        description=proj.description,
        technologies=proj.technologies,
        skills_demonstrated=proj.skills_demonstrated,
        repo_url=proj.repo_url,
        demo_url=proj.demo_url,
        status=proj.status
    )
    db.add(new_proj)
    db.commit()
    db.refresh(new_proj)
    return new_proj
