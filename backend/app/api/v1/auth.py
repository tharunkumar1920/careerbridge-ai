from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.core.exceptions import BadRequestException, ConflictException
from app.models.user import User, UserRole
from app.models.profile import StudentProfile, RecruiterProfile
from app.schemas.auth import LoginRequest, RegisterRequest, Token, UserResponse
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(req: RegisterRequest, response: Response, db: Session = Depends(get_db)):
    """Register a new student or recruiter account."""
    existing = db.query(User).filter(User.email == req.email.lower()).first()
    if existing:
        raise ConflictException(f"An account with email {req.email} already exists")

    # Security check: Prevent arbitrary admin registration
    role = req.role
    if role == UserRole.ADMIN:
        role = UserRole.STUDENT

    new_user = User(
        email=req.email.lower(),
        hashed_password=get_password_hash(req.password),
        role=role,
        is_active=True,
        is_verified=True
    )
    db.add(new_user)
    db.flush()

    # Create corresponding profile
    name = req.name.strip()
    if role == UserRole.STUDENT:
        student_prof = StudentProfile(
            user_id=new_user.id,
            full_name=name,
            university=req.university_or_company or "Stanford University",
            target_role=req.target_role_or_industry or "AI / Machine Learning Engineer",
            career_readiness_score=45.0
        )
        db.add(student_prof)
    elif role == UserRole.RECRUITER:
        recruiter_prof = RecruiterProfile(
            user_id=new_user.id,
            full_name=name,
            company_name=req.university_or_company or "Tech Frontiers Inc.",
            industry=req.target_role_or_industry or "Technology",
            is_verified=True
        )
        db.add(recruiter_prof)

    db.commit()
    db.refresh(new_user)

    token = create_access_token(subject=new_user.id, role=new_user.role.value)

    # Set secure http-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False  # True in production HTTPS
    )

    return Token(
        access_token=token,
        token_type="bearer",
        role=new_user.role,
        user_id=new_user.id,
        email=new_user.email,
        name=name
    )


@router.post("/login", response_model=Token)
def login(req: LoginRequest, response: Response, db: Session = Depends(get_db)):
    login_email = req.email.lower()
    if login_email == "student@careerbridge.ai":
        login_email = "student@skilllink.ai"
    user = db.query(User).filter(User.email == login_email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is suspended or deactivated"
        )

    name = user.email.split("@")[0]
    if user.student_profile:
        name = user.student_profile.full_name
    elif user.recruiter_profile:
        name = user.recruiter_profile.full_name

    token = create_access_token(subject=user.id, role=user.role.value)

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )

    return Token(
        access_token=token,
        token_type="bearer",
        role=user.role,
        user_id=user.id,
        email=user.email,
        name=name
    )


@router.post("/logout")
def logout(response: Response):
    """Clear session authentication cookie."""
    response.delete_cookie(key="access_token")
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Return currently authenticated user identity and role."""
    return current_user
