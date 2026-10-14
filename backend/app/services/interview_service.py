from typing import List, Dict, Any, Tuple
from sqlalchemy.orm import Session
from app.models.interview import InterviewSession, InterviewQuestion
from app.schemas.interview import InterviewStartRequest


class InterviewService:
    QUESTION_BANK = {
        "AI / Machine Learning Engineer": [
            {
                "question": "Explain the difference between self-attention and cross-attention in Transformer architectures. Under what circumstances does quadratic O(N^2) memory complexity become prohibitive?",
                "category": "technical",
                "rubric": ["Query/Key/Value matrix distinction", "Sequence length scaling", "Memory bottleneck identification", "Attention optimizations (FlashAttention)"],
                "model_answer": "In self-attention, Queries, Keys, and Values all originate from the same sequence representation (X * W_Q, X * W_K, X * W_V). In cross-attention (e.g. Decoder attending to Encoder outputs), Queries come from the target sequence while Keys and Values come from the conditioning context. The Q*K^T operation produces an N x N attention matrix requiring O(N^2) memory and compute, which becomes prohibitive during long-context processing (e.g., sequences > 8k tokens) without memory-efficient IO-aware kernels like FlashAttention."
            },
            {
                "question": "How do you detect and mitigate vanishing or exploding gradients when training deep neural networks with custom layers?",
                "category": "technical",
                "rubric": ["Gradient norm monitoring", "Weight initialization (He/Xavier)", "Residual skip connections", "LayerNorm/BatchNorm", "Gradient clipping"],
                "model_answer": "Detection is accomplished by monitoring gradient L2 norms per layer and tensor activation variance across forward passes. Exploding gradients lead to NaN/Inf values, while vanishing gradients cause saturation in early layers. Mitigation techniques include proper initialization (Kaiming He or Xavier), residual skip connections to preserve gradient highways, normalization layers (LayerNorm/RMSNorm), and gradient clipping (e.g., torch.nn.utils.clip_grad_norm_)."
            },
            {
                "question": "Describe a scenario where you faced a significant divergence in validation loss during training. How did you diagnose whether it was data contamination, bad learning rate, or model instability?",
                "category": "behavioral",
                "rubric": ["Systematic debugging approach", "Loss curve analysis", "Data audit methodology", "Resolution outcome"],
                "model_answer": "I first isolated the batch size and learning rate scheduler by running an overfit test on a tiny 50-example subset. If the model cannot overfit 50 examples, the bug is architectural or numerical. Next, I inspected loss spikes against specific training batches to identify corrupt or out-of-distribution inputs, followed by verifying gradient scaling."
            }
        ],
        "Full-Stack Systems Engineer": [
            {
                "question": "How do ACID transaction guarantees differ between PostgreSQL and eventual consistency models in distributed NoSQL databases? How do you prevent race conditions during concurrent account balance deductions?",
                "category": "technical",
                "rubric": ["Atomicity, Consistency, Isolation, Durability", "Isolation levels (Read Committed vs Serializable)", "Optimistic vs Pessimistic locking (SELECT FOR UPDATE)"],
                "model_answer": "PostgreSQL enforces ACID transactions where Isolation ensures concurrent transactions execute without cross-contamination. In NoSQL systems relying on BASE, updates propagate asynchronously. To prevent race conditions in financial operations, use pessimistic row-level locking via 'SELECT balance FROM accounts WHERE id = ? FOR UPDATE' inside a database transaction, or utilize atomic database conditions with conditional updates."
            },
            {
                "question": "Explain how React 19 server components and concurrent rendering differ from traditional client-side rendering with SPAs.",
                "category": "technical",
                "rubric": ["Server component hydration savings", "Streaming HTML", "Zero bundle footprint for server logic", "State persistence across transitions"],
                "model_answer": "React Server Components execute strictly on the server and emit serialized JSON/JSX payloads rather than shipping JavaScript code to client bundles, drastically reducing client JS overhead. Concurrent features allow React to interrupt non-urgent renders to maintain responsive input and smooth animations."
            }
        ]
    }

    @classmethod
    def start_session(
        cls,
        db: Session,
        student_id: int,
        req: InterviewStartRequest
    ) -> InterviewSession:
        """Create a new mock interview session with targeted questions."""
        session = InterviewSession(
            student_id=student_id,
            target_role=req.target_role,
            category=req.category,
            difficulty=req.difficulty,
            status="in_progress",
            overall_score=0.0
        )
        db.add(session)
        db.flush()

        role_bank = cls.QUESTION_BANK.get(req.target_role, cls.QUESTION_BANK["AI / Machine Learning Engineer"])
        selected_questions = [q for q in role_bank if q["category"] == req.category or req.category == "all"]
        if not selected_questions:
            selected_questions = role_bank

        for q_data in selected_questions:
            question = InterviewQuestion(
                session_id=session.id,
                question_text=q_data["question"],
                category=q_data["category"],
                rubric_criteria=q_data["rubric"],
                model_answer=q_data["model_answer"],
                score=0.0,
                strengths=[],
                improvements=[]
            )
            db.add(question)

        db.commit()
        db.refresh(session)
        return session

    @classmethod
    def evaluate_answer(
        cls,
        db: Session,
        question: InterviewQuestion,
        answer_text: str
    ) -> InterviewQuestion:
        """Evaluate student answer against rubric using structured criteria."""
        question.student_answer = answer_text

        answer_lower = answer_text.lower()
        rubric = question.rubric_criteria
        matched_criteria = []
        missing_criteria = []

        for crit in rubric:
            words = [w.lower() for w in crit.split() if len(w) > 3]
            if any(w in answer_lower for w in words):
                matched_criteria.append(crit)
            else:
                missing_criteria.append(crit)

        # Length and technical depth factor
        word_count = len(answer_text.split())
        depth_score = min(30, int((word_count / 80.0) * 30))

        # Rubric coverage factor
        rubric_ratio = (len(matched_criteria) / max(1, len(rubric)))
        rubric_score = int(rubric_ratio * 70)

        total_score = min(96, max(30, depth_score + rubric_score))

        strengths = [f"Addressed key conceptual area: {m}" for m in matched_criteria[:2]]
        if word_count > 60:
            strengths.append("Demonstrated solid analytical explanation length and technical clarity.")

        improvements = [f"Deepen coverage on: {m}" for m in missing_criteria[:2]]
        if word_count < 40:
            improvements.append("Elaborate further with concrete architecture examples or equation derivations.")

        question.score = float(total_score)
        question.strengths = strengths if strengths else ["Answer provided in clear, coherent structure."]
        question.improvements = improvements if improvements else ["Strong comprehensive answer. Consider mentioning industry edge cases."]

        db.flush()

        # Recalculate session overall score
        session = db.query(InterviewSession).filter(InterviewSession.id == question.session_id).first()
        if session:
            all_qs = session.questions
            answered_qs = [q for q in all_qs if q.student_answer is not None]
            if answered_qs:
                avg_score = sum(q.score for q in answered_qs) / len(answered_qs)
                session.overall_score = round(avg_score, 1)
                if len(answered_qs) == len(all_qs):
                    session.status = "completed"
                    session.feedback_summary = (
                        f"Completed {len(all_qs)} questions with average score of {session.overall_score}%. "
                        f"Overall strong articulation of technical concepts."
                    )

        db.commit()
        db.refresh(question)
        return question
