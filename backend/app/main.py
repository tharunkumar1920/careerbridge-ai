from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import logger
from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.db.seed import seed_database
from app.api.v1.router import api_v1_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    logger.info("Initializing Skill Link Database Tables...")
    Base.metadata.create_all(bind=engine)

    # Seed demonstration skills, roles, roadmaps, and jobs
    db = SessionLocal()
    try:
        seed_database(db)
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
    finally:
        db.close()

    logger.info("Skill Link Backend successfully initialized!")
    yield
    logger.info("Skill Link Backend shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    description="Unified AI-powered career intelligence, educational guidance, and recruitment platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 router
app.include_router(api_v1_router, prefix=settings.API_V1_PREFIX)


@app.get("/health", tags=["Health"])
def health_check():
    """Verify backend API health status."""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "environment": settings.APP_ENV,
        "version": "1.0.0"
    }


@app.get("/", tags=["Root"])
def root():
    """Root endpoint with API overview."""
    return {
        "message": "Welcome to Skill Link API",
        "documentation": "/docs",
        "api_v1": settings.API_V1_PREFIX
    }
