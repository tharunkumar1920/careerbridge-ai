from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.learning import LearningResource
from app.schemas.learning import LearningResourceResponse

router = APIRouter(prefix="/resources", tags=["Learning Resources"])


@router.get("", response_model=List[LearningResourceResponse])
def get_learning_resources(
    topic: Optional[str] = Query(None),
    skill: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """Retrieve catalogued courses, tutorials, and documentation."""
    query = db.query(LearningResource)
    if topic:
        query = query.filter(LearningResource.topic.ilike(f"%{topic}%"))
    if skill:
        query = query.filter(LearningResource.skill_name.ilike(f"%{skill}%"))
    if difficulty:
        query = query.filter(LearningResource.difficulty.ilike(difficulty))

    return query.all()


@router.get("/{resource_id}", response_model=LearningResourceResponse)
def get_resource_details(resource_id: int, db: Session = Depends(get_db)):
    """Retrieve individual learning resource."""
    res = db.query(LearningResource).filter(LearningResource.id == resource_id).first()
    if not res:
        raise HTTPException(status_code=404, detail="Resource not found")
    return res
