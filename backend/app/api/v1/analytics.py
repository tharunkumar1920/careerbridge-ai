from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.analytics import PlatformAnalyticsResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["Market & Opportunity Intelligence"])


@router.get("/overview", response_model=PlatformAnalyticsResponse)
def get_market_analytics(db: Session = Depends(get_db)):
    """
    Retrieve empirical skill demand and hiring trends aggregated across platform job postings.
    Includes data source citations and observation periods.
    """
    return AnalyticsService.get_platform_analytics(db)
