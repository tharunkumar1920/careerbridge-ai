import io
import re
from typing import List, Dict, Any, Tuple
from pypdf import PdfReader
from sqlalchemy.orm import Session
from app.models.career import CareerRole, Skill
from app.schemas.resume import ResumeAnalysisResponse


class ResumeService:
    @staticmethod
    def extract_text_from_pdf_or_text(file_bytes: bytes, filename: str) -> str:
        """Safely extract plain text from uploaded PDF or text file."""
        if filename.lower().endswith(".pdf"):
            try:
                reader = PdfReader(io.BytesIO(file_bytes))
                text_pages = []
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text_pages.append(page_text)
                return "\n".join(text_pages)
            except Exception as e:
                # Fallback to UTF-8 decoding if pdf reading fails
                return file_bytes.decode("utf-8", errors="ignore")
        else:
            return file_bytes.decode("utf-8", errors="ignore")

    @classmethod
    def analyze_resume_text(
        cls,
        db: Session,
        resume_text: str,
        target_role_slug: str = "ai-ml"
    ) -> Dict[str, Any]:
        """
        Analyze resume against structured skills and target role.
        Evaluates:
        - Parsed skills found in text
        - Missing critical skills for target role
        - Formatting / structural health check
        - Action-verb impact enhancement
        - Resume readiness score (0-100)
        """
        lower_text = resume_text.lower()

        # 1. Match skills from database catalogue
        all_skills = db.query(Skill).all()
        parsed_skills = []
        for s in all_skills:
            pattern = r'\b' + re.escape(s.name.lower()) + r'\b'
            if re.search(pattern, lower_text) or s.name.lower() in lower_text:
                parsed_skills.append(s.name)

        # 2. Check against target role requirements
        role = db.query(CareerRole).filter(
            (CareerRole.slug == target_role_slug) | (CareerRole.title.ilike(f"%{target_role_slug}%"))
        ).first()

        missing_critical_skills = []
        if role:
            for req in role.skill_requirements:
                if req.skill and req.skill.name not in parsed_skills:
                    missing_critical_skills.append(req.skill.name)

        # 3. Formatting & Structure Checks
        formatting_issues = []
        if len(resume_text.split()) < 100:
            formatting_issues.append("Resume length is unusually brief (under 100 words). Add project details and deliverables.")
        if "@" not in resume_text:
            formatting_issues.append("No contact email detected in document header.")
        if "github" not in lower_text and "portfolio" not in lower_text:
            formatting_issues.append("Missing GitHub or portfolio hyperlink for code evaluation.")
        if not any(word in lower_text for word in ["education", "university", "college", "degree"]):
            formatting_issues.append("No standard 'Education' section heading detected.")

        # 4. Action-verb and Quantifiable Metrics Analysis
        action_verbs = ["engineered", "developed", "deployed", "reduced", "optimized", "implemented", "scaled", "designed", "accelerated"]
        found_verbs = [v for v in action_verbs if v in lower_text]
        actionable_improvements = []

        if len(found_verbs) < 3:
            actionable_improvements.append("Use strong action verbs (e.g. 'Engineered', 'Benchmarked', 'Optimized') to begin bullet points.")

        has_metrics = bool(re.search(r'\d+%', resume_text) or re.search(r'\d+x', lower_text) or re.search(r'\$\d+', resume_text))
        if not has_metrics:
            actionable_improvements.append("Incorporate quantifiable impact metrics (e.g., 'reduced inference latency by 34%', 'served 10k users').")

        # Suggestions for weak phrases
        impact_suggestions = [
            {
                "weak_phrase": "Worked on machine learning model",
                "recommended_enhancement": "Engineered PyTorch transformer model optimizing cross-entropy loss by 22%."
            },
            {
                "weak_phrase": "Responsible for API endpoints",
                "recommended_enhancement": "Architected asynchronous FastAPI microservice handling 450 concurrent requests with sub-50ms latency."
            },
            {
                "weak_phrase": "Helped team build website",
                "recommended_enhancement": "Co-developed responsive React client interface with zero state desynchronization defects."
            }
        ]

        # Calculate score
        skill_score = min(40, len(parsed_skills) * 8)
        formatting_score = max(0, 30 - len(formatting_issues) * 7)
        impact_score = min(30, (len(found_verbs) * 4) + (10 if has_metrics else 0))
        total_score = min(98, max(20, skill_score + formatting_score + impact_score))

        return {
            "score": total_score,
            "parsed_skills": list(set(parsed_skills)),
            "missing_critical_skills": missing_critical_skills,
            "formatting_issues": formatting_issues,
            "actionable_improvements": actionable_improvements,
            "impact_suggestions": impact_suggestions,
            "preview": resume_text[:600] + ("..." if len(resume_text) > 600 else "")
        }
