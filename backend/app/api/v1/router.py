from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.students import router as students_router
from app.api.v1.careers import router as careers_router
from app.api.v1.roadmaps import router as roadmaps_router
from app.api.v1.resources import router as resources_router
from app.api.v1.jobs import router as jobs_router
from app.api.v1.applications import router as applications_router
from app.api.v1.recruiters import router as recruiters_router
from app.api.v1.resumes import router as resumes_router
from app.api.v1.interviews import router as interviews_router
from app.api.v1.assistant import router as assistant_router
from app.api.v1.analytics import router as analytics_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router)
api_v1_router.include_router(students_router)
api_v1_router.include_router(careers_router)
api_v1_router.include_router(roadmaps_router)
api_v1_router.include_router(resources_router)
api_v1_router.include_router(jobs_router)
api_v1_router.include_router(applications_router)
api_v1_router.include_router(recruiters_router)
api_v1_router.include_router(resumes_router)
api_v1_router.include_router(interviews_router)
api_v1_router.include_router(assistant_router)
api_v1_router.include_router(analytics_router)
