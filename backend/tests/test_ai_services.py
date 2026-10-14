import io


def test_resume_upload_and_analysis(client, student_auth_headers):
    sample_resume = (
        "Alex Rivera\n"
        "alex@stanford.edu | github.com/alexrivera-ai\n\n"
        "EDUCATION\n"
        "Stanford University, B.S. Computer Science, 2026\n\n"
        "TECHNICAL SKILLS\n"
        "Python Systems & Vectorization, Deep Learning & PyTorch, Machine Learning Fundamentals, SQL, Docker\n\n"
        "EXPERIENCE & PROJECTS\n"
        "Distributed Attention Profiler: Engineered custom CUDA PyTorch autograd kernel reducing latency by 34%.\n"
        "High-Throughput Vector Indexer: Deployed FastAPI microservice indexing 250k embeddings per minute.\n"
    )

    files = {"file": ("resume.txt", io.BytesIO(sample_resume.encode("utf-8")), "text/plain")}
    data = {"target_role": "ai-ml"}

    response = client.post("/api/v1/resumes/upload", files=files, data=data, headers=student_auth_headers)
    assert response.status_code == 200
    res_data = response.json()
    assert res_data["analysis_score"] >= 50
    assert "Python Systems & Vectorization" in res_data["parsed_skills"]
    assert len(res_data["actionable_improvements"]) >= 0


def test_mock_interview_workflow(client, student_auth_headers):
    # 1. Start Session
    start_res = client.post(
        "/api/v1/interviews/start",
        json={"target_role": "AI / Machine Learning Engineer", "category": "technical", "difficulty": "intermediate"},
        headers=student_auth_headers
    )
    assert start_res.status_code == 201
    session = start_res.json()
    assert len(session["questions"]) >= 1
    question_id = session["questions"][0]["id"]

    # 2. Submit Answer
    answer_res = client.post(
        f"/api/v1/interviews/questions/{question_id}/answer",
        json={"question_id": question_id, "student_answer": "In self-attention, queries, keys, and values are calculated from the same input representations. The attention score is Q * K^T divided by square root of d_k. Quadratic memory O(N^2) complexity becomes prohibitive during long sequences, requiring optimizations like FlashAttention."},
        headers=student_auth_headers
    )
    assert answer_res.status_code == 200
    eval_data = answer_res.json()
    assert eval_data["score"] > 40
    assert len(eval_data["strengths"]) > 0


def test_assistant_grounded_chat(client, student_auth_headers):
    response = client.post(
        "/api/v1/assistant/chat",
        json={"message": "What jobs are open on Skill Link right now?"},
        headers=student_auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role"] == "assistant"
    assert "Google DeepMind" in data["content"] or "Stripe" in data["content"]
    assert data["structured_data"]["target_role"] is not None
