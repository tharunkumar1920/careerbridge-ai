from typing import List, Dict, Any, Tuple
from sqlalchemy.orm import Session
from app.models.profile import StudentProfile
from app.models.job import Job, SavedJob
from app.models.application import Application
from app.schemas.job import JobMatchResponse, JobResponse


class JobMatchingEngine:
    @staticmethod
    def normalize_skill(name: str) -> str:
        """Normalize skill string for resilient fuzzy matching."""
        return name.lower().strip().replace("-", " ").replace("/", " ")

    @classmethod
    def calculate_job_match(
        cls,
        student: StudentProfile,
        job: Job,
        is_saved: bool = False,
        has_applied: bool = False
    ) -> JobMatchResponse:
        """
        Explainable matching algorithm:
        1. Compare student skills (both self-reported and verified projects) against Job's required skills.
        2. Weight Required Skills as 70% of baseline score.
        3. Weight Preferred Skills as 30% of baseline score.
        4. Boost score by +5% if student has a completed project explicitly demonstrating matched skills.
        5. Generate transparent list of matched skills, missing critical requirements, and learning recommendations.
        """
        student_skill_names = {
            cls.normalize_skill(ss.skill.name) for ss in student.skills if ss.skill
        }
        # Add skills from student projects
        project_skills = set()
        for p in student.projects:
            for s in p.skills_demonstrated:
                project_skills.add(cls.normalize_skill(s))
            for t in p.technologies:
                project_skills.add(cls.normalize_skill(t))

        all_student_competencies = student_skill_names.union(project_skills)

        required_skills = job.required_skills or []
        preferred_skills = job.preferred_skills or []

        matched_skills: List[str] = []
        missing_critical_skills: List[str] = []
        recommended_to_learn: List[str] = []

        req_matches = 0
        for req in required_skills:
            norm_req = cls.normalize_skill(req)
            # Check match against student skills
            if any(norm_req in comp or comp in norm_req for comp in all_student_competencies):
                matched_skills.append(req)
                req_matches += 1
            else:
                missing_critical_skills.append(req)

        pref_matches = 0
        for pref in preferred_skills:
            norm_pref = cls.normalize_skill(pref)
            if any(norm_pref in comp or comp in norm_pref for comp in all_student_competencies):
                matched_skills.append(pref)
                pref_matches += 1
            else:
                recommended_to_learn.append(pref)

        # Baseline calculation
        total_req_count = max(1, len(required_skills))
        total_pref_count = max(1, len(preferred_skills))

        req_component = (req_matches / total_req_count) * 70.0
        pref_component = (pref_matches / total_pref_count) * 30.0 if preferred_skills else 15.0

        project_bonus = 0.0
        if len(project_skills) > 0 and len(matched_skills) > 0:
            project_bonus = 5.0

        raw_match = req_component + pref_component + project_bonus
        final_match_score = int(round(min(98, max(25, raw_match))))

        # Detailed explainability rationale
        if len(missing_critical_skills) == 0:
            why_match = (
                f"Exceptional alignment ({final_match_score}%). Your profile demonstrates all "
                f"{len(required_skills)} core required technical competencies for {job.company}."
            )
            eligibility_note = "High technical match based on current profile and portfolio evidence."
        else:
            why_match = (
                f"Moderate alignment ({final_match_score}%). You meet {req_matches} of {len(required_skills)} "
                f"required skills. Closing gap in {missing_critical_skills[0]} will substantially improve fit."
            )
            eligibility_note = f"Core gaps identified in: {', '.join(missing_critical_skills)}."

        job_resp = JobResponse.model_validate(job)

        return JobMatchResponse(
            job=job_resp,
            match_score=final_match_score,
            matched_skills=list(set(matched_skills)),
            missing_critical_skills=missing_critical_skills,
            recommended_to_learn=recommended_to_learn,
            why_match=why_match,
            eligibility_note=eligibility_note,
            is_saved=is_saved,
            has_applied=has_applied
        )

    @classmethod
    def match_opportunities_for_student(
        cls,
        db: Session,
        student: StudentProfile,
        category: str = None
    ) -> List[JobMatchResponse]:
        """Fetch active jobs and rank them transparently for a given student."""
        query = db.query(Job).filter(Job.is_active == True)
        if category and category.lower() != "all":
            query = query.filter(Job.category.ilike(f"%{category}%"))

        jobs = query.all()

        # Find saved jobs and applied jobs for this student
        saved_job_ids = {
            sj.job_id for sj in db.query(SavedJob).filter(SavedJob.student_id == student.id).all()
        }
        applied_job_ids = {
            app.job_id for app in db.query(Application).filter(Application.student_id == student.id).all()
        }

        matched_results: List[JobMatchResponse] = []
        for j in jobs:
            match_item = cls.calculate_job_match(
                student=student,
                job=j,
                is_saved=(j.id in saved_job_ids),
                has_applied=(j.id in applied_job_ids)
            )
            matched_results.append(match_item)

        # Sort by match score descending
        matched_results.sort(key=lambda m: m.match_score, reverse=True)
        return matched_results
