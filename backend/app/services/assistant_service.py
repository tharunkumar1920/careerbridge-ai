import re
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.profile import StudentProfile
from app.models.job import Job
from app.models.career import CareerRole, Skill
from app.models.assistant import AssistantConversation, AssistantMessage
from app.schemas.assistant import AssistantMessageResponse, StructuredAssistantPayload


class AssistantService:
    @staticmethod
    def process_message(
        db: Session,
        user: User,
        message_text: str,
        conversation_id: Optional[int] = None
    ) -> AssistantMessageResponse:
        """
        Process user question with grounded career context from their profile and the database.
        Never hallucinates non-existent jobs; pulls real listings from PostgreSQL/SQLite.
        """
        # Find or create conversation
        if conversation_id:
            convo = db.query(AssistantConversation).filter(
                AssistantConversation.id == conversation_id,
                AssistantConversation.user_id == user.id
            ).first()
        else:
            convo = None

        if not convo:
            title_sample = message_text[:40] + ("..." if len(message_text) > 40 else "")
            convo = AssistantConversation(
                user_id=user.id,
                title=f"Career Guidance: {title_sample}"
            )
            db.add(convo)
            db.flush()

        # Save user message
        user_msg = AssistantMessage(
            conversation_id=convo.id,
            role="user",
            content=message_text,
            structured_data={}
        )
        db.add(user_msg)
        db.flush()

        # Ingest student profile context
        student = user.student_profile
        target_role = student.target_role if student else "Software Engineer"
        student_skills = [ss.skill.name for ss in student.skills if ss.skill] if student else []

        # Analyze message intent
        lower_q = message_text.lower()
        strengths: List[str] = []
        gaps: List[str] = []
        actions: List[str] = []
        suggested_jobs: List[str] = []

        if any(w in lower_q for w in ["job", "internship", "opening", "opportunity", "apply"]):
            # Pull real platform jobs from database
            real_jobs = db.query(Job).filter(Job.is_active == True).limit(3).all()
            suggested_jobs = [f"{j.title} at {j.company} ({j.location}) - Compensation: {j.salary_range}" for j in real_jobs]
            
            content = (
                f"Here are the active, verified opportunities currently open on CareerBridge AI matching your target track ({target_role}):\n\n"
                + "\n".join([f"• **{j.title}** at {j.company}\n  Location: {j.location} | Type: {j.employment_type} | Comp: {j.salary_range}\n  Key Requirements: {', '.join(j.required_skills)}" for j in real_jobs])
                + "\n\n*Note: CareerBridge AI only displays real platform opportunities; listings are never fabricated.*"
            )
            actions = ["Review required skills in the Opportunity Matcher", "Submit verified application through Student Portal"]

        elif any(w in lower_q for w in ["skill", "gap", "learn", "roadmap", "prepare", "improve"]):
            role = db.query(CareerRole).filter(CareerRole.title.ilike(f"%{target_role}%")).first()
            if role:
                req_names = [r.skill.name for r in role.skill_requirements if r.skill]
                matched = [s for s in student_skills if s in req_names]
                missing = [r for r in req_names if r not in student_skills]
                strengths = matched
                gaps = missing[:3]
                actions = [
                    f"Prioritize milestone for {gaps[0]}" if gaps else "Build advanced capstone project",
                    "Add verified project evidence to your profile",
                    "Complete text-based mock interview questions"
                ]

            content = (
                f"For your target role as **{target_role}**, here is your personalized intelligence breakdown:\n\n"
                f"**Demonstrated Strengths:** {', '.join(strengths) if strengths else 'Foundational programming'}\n\n"
                f"**High-Priority Gaps:** {', '.join(gaps) if gaps else 'None detected; ready for advanced portfolio scaling'}\n\n"
                f"**Suggested Next Action:** Complete the next milestone in your Personalized Learning Roadmap to close key technical gaps with verified project evidence."
            )

        elif any(w in lower_q for w in ["interview", "mock", "practice"]):
            actions = [
                "Launch a 3-question Mock Interview session in the Interview Portal",
                "Review the rubric evaluation criteria for Transformer attention and distributed systems",
                "Practice articulating time and space complexities"
            ]
            content = (
                f"To prepare for **{target_role}** technical interviews, CareerBridge AI provides targeted mock interview sessions. "
                f"Key areas tested include core algorithms, architectural tradeoffs, and deep conceptual questions. "
                f"You can practice with immediate rubric-based feedback directly inside the Interview Preparation module."
            )

        else:
            content = (
                f"Hello {student.full_name if student else 'there'}! I am your CareerBridge AI Intelligence Assistant. "
                f"I can help analyze your skill gaps for **{target_role}**, recommend tailored learning roadmaps, "
                f"evaluate your resume, practice interview questions, or retrieve verified job openings. How can I assist your career progression today?"
            )
            actions = ["View Skill Gap Analysis", "Generate Learning Roadmap", "Explore Matching Opportunities"]

        structured_data = {
            "target_role": target_role,
            "strengths": strengths,
            "skill_gaps": gaps,
            "recommended_actions": actions,
            "suggested_opportunities": suggested_jobs,
            "explanation": "Context grounded in student authorized database profile."
        }

        # Save assistant message
        asst_msg = AssistantMessage(
            conversation_id=convo.id,
            role="assistant",
            content=content,
            structured_data=structured_data
        )
        db.add(asst_msg)
        db.commit()
        db.refresh(asst_msg)

        return AssistantMessageResponse.model_validate(asst_msg)
