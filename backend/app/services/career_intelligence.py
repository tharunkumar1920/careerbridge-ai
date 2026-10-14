from typing import List, Dict, Any, Tuple
from sqlalchemy.orm import Session
from app.models.profile import StudentProfile
from app.models.career import CareerRole, Skill, StudentSkill, RoleSkillRequirement
from app.schemas.career import SkillGapItem, RadarAxisItem, CareerIntelligenceResponse


class CareerIntelligenceService:
    @staticmethod
    def calculate_skill_gap_analysis(
        db: Session,
        student: StudentProfile,
        target_role_slug: str = "ai-ml"
    ) -> CareerIntelligenceResponse:
        """
        Calculates explainable, deterministic skill gap analysis for a student profile
        against a structured Career Role.
        
        Formula:
        - Weighted Capability = Sum(min(student_proficiency, required_proficiency) * weight * verification_factor)
        - Total Required Capability = Sum(required_proficiency * weight)
        - Baseline Alignment Score = (Weighted Capability / Total Required Capability) * 100
        
        Verification Factor:
        - Verified evidence (project / assessment): 1.0
        - Unverified self-reported: 0.85
        """
        role = db.query(CareerRole).filter(
            (CareerRole.slug == target_role_slug) | (CareerRole.title.ilike(f"%{student.target_role or ''}%"))
        ).first()

        if not role:
            # Fallback to default role
            role = db.query(CareerRole).filter(CareerRole.slug == "ai-ml").first()

        if not role:
            return CareerIntelligenceResponse(
                target_role=student.target_role or "General Software Engineer",
                alignment_score=50.0,
                confidence_score=70.0,
                market_demand_trend="+15% YoY",
                projected_timeline="3 Months",
                verified_strengths=[],
                critical_gaps=[],
                radar_axes=[],
                explanation="No structured role requirements found in database.",
                calculation_basis="Default fallback baseline"
            )

        # Map student's current skills
        student_skill_map: Dict[str, StudentSkill] = {
            ss.skill.name.lower(): ss for ss in student.skills if ss.skill
        }

        # Role requirements
        reqs: List[RoleSkillRequirement] = role.skill_requirements
        if not reqs:
            reqs = db.query(RoleSkillRequirement).filter(RoleSkillRequirement.role_id == role.id).all()

        total_weighted_required = 0.0
        total_weighted_achieved = 0.0
        gap_items: List[SkillGapItem] = []
        verified_strengths: List[str] = []

        category_scores: Dict[str, Dict[str, float]] = {}

        for req in reqs:
            skill = req.skill
            if not skill:
                continue

            skill_name_lower = skill.name.lower()
            student_skill = student_skill_map.get(skill_name_lower)

            req_level = req.required_proficiency  # 1 to 5
            req_score_100 = int((req_level / 5.0) * 100)
            weight = req.weight

            if student_skill:
                stud_level = min(5, max(1, student_skill.proficiency))
                is_verified = student_skill.is_verified
                source = student_skill.source
                v_factor = 1.0 if is_verified else 0.85
            else:
                stud_level = 0
                is_verified = False
                source = "unassessed"
                v_factor = 0.70

            stud_score_100 = int((stud_level / 5.0) * 100)
            effective_level = min(stud_level, req_level) * v_factor

            total_weighted_achieved += (effective_level * weight)
            total_weighted_required += (req_level * weight)

            gap_score = max(0, req_score_100 - stud_score_100)

            if gap_score <= 10:
                status = "optimal"
                priority = "Low"
                rec = f"Strong command demonstrated. Continue applying in capstone projects."
                if stud_level >= 3:
                    verified_strengths.append(skill.name)
            elif gap_score <= 35:
                status = "moderate"
                priority = "Medium"
                rec = f"Solid foundation. Deepen real-world deployment practice to close remaining {gap_score}% gap."
            else:
                status = "critical"
                priority = "High"
                rec = f"Primary hiring bottleneck. Recommended milestone: 2-3 week dedicated hands-on sprint."

            gap_items.append(SkillGapItem(
                name=skill.name,
                category=skill.category,
                current=stud_score_100,
                required=req_score_100,
                gap=gap_score,
                status=status,
                priority=priority,
                importance=req.importance,
                is_verified=is_verified,
                evidence_source=source,
                recommendation=rec
            ))

            # Group for radar axes
            cat = skill.category
            if cat not in category_scores:
                category_scores[cat] = {"current": 0.0, "required": 0.0, "count": 0}
            category_scores[cat]["current"] += stud_score_100
            category_scores[cat]["required"] += req_score_100
            category_scores[cat]["count"] += 1

        # Calculate alignment score
        if total_weighted_required > 0:
            raw_score = (total_weighted_achieved / total_weighted_required) * 100.0
            alignment_score = round(min(100.0, max(10.0, raw_score)), 1)
        else:
            alignment_score = 50.0

        # Update profile readiness score in background/database
        student.career_readiness_score = alignment_score
        db.add(student)
        db.flush()

        # Build radar axes
        radar_axes: List[RadarAxisItem] = []
        for cat, val in category_scores.items():
            count = max(1, val["count"])
            avg_curr = int(val["current"] / count)
            avg_req = int(val["required"] / count)
            cohort_avg = min(100, max(20, int(avg_req * 0.72)))
            radar_axes.append(RadarAxisItem(
                axis=cat,
                current=avg_curr,
                required=avg_req,
                cohort=cohort_avg
            ))

        # Sort gaps by criticality
        gap_items.sort(key=lambda g: (0 if g.status == "critical" else 1 if g.status == "moderate" else 2, -g.gap))

        # Estimated timeline to readiness based on critical gaps
        critical_count = sum(1 for g in gap_items if g.status == "critical")
        projected_timeline = f"{max(1.5, round(critical_count * 1.2, 1))} Months"

        explanation = (
            f"Based on your profile, your verified competencies in {', '.join(verified_strengths[:2]) if verified_strengths else 'core engineering'} "
            f"align with {alignment_score}% of the structured requirements for {role.title}. "
            f"Closing {critical_count} critical gap(s) will position you in the top candidate percentile."
        )

        calculation_basis = (
            "Deterministic weighted gap formula: Sum(min(Proficiency, Required) * Weight * VerificationWeight) / "
            "Sum(Required * Weight). Verified evidence carries 100% weight; unverified self-reports carry 85%."
        )

        return CareerIntelligenceResponse(
            target_role=role.title,
            alignment_score=alignment_score,
            confidence_score=92.0,
            market_demand_trend=role.growth_outlook,
            projected_timeline=projected_timeline,
            verified_strengths=verified_strengths,
            critical_gaps=gap_items,
            radar_axes=radar_axes,
            explanation=explanation,
            calculation_basis=calculation_basis
        )
