from typing import Optional
from fastapi import Depends, Header, HTTPException, status, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import decode_token
from app.core.exceptions import CredentialsException, PermissionDeniedException
from app.models.user import User, UserRole
from app.models.profile import StudentProfile, RecruiterProfile


def get_current_user(
    request: Request,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    """
    Extract and validate JWT token from Authorization header (Bearer ...)
    or fallback to http-only cookie 'access_token'.
    """
    token = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
    elif "access_token" in request.cookies:
        token = request.cookies.get("access_token")

    if not token:
        raise CredentialsException("Authentication token missing")

    payload = decode_token(token)
    if not payload or not payload.get("sub"):
        raise CredentialsException("Invalid or expired authentication token")

    user_id = int(payload.get("sub"))
    user = db.query(User).filter(User.id == user_id, User.is_active == True).first()
    if not user:
        raise CredentialsException("User account not found or deactivated")

    return user


def require_student(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> StudentProfile:
    """Verify that current user has STUDENT role and return their student profile."""
    if current_user.role != UserRole.STUDENT and current_user.role != UserRole.ADMIN:
        raise PermissionDeniedException("Access restricted to student accounts")

    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student profile not found. Please complete profile setup."
        )
    return profile


def require_recruiter(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> RecruiterProfile:
    """Verify that current user has RECRUITER role and return their recruiter profile."""
    if current_user.role != UserRole.RECRUITER and current_user.role != UserRole.ADMIN:
        raise PermissionDeniedException("Access restricted to recruiter accounts")

    profile = db.query(RecruiterProfile).filter(RecruiterProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recruiter company profile not found. Please complete setup."
        )
    return profile


def require_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    """Verify that current user has ADMIN role."""
    if current_user.role != UserRole.ADMIN:
        raise PermissionDeniedException("Administrator privileges required")
    return current_user
