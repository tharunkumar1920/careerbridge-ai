def test_public_jobs(client):
    response = client.get("/api/v1/jobs")
    assert response.status_code == 200
    jobs = response.json()
    assert len(jobs) >= 4


def test_matched_jobs_for_student(client, student_auth_headers):
    response = client.get("/api/v1/jobs/matched", headers=student_auth_headers)
    assert response.status_code == 200
    matched = response.json()
    assert len(matched) >= 4
    # Ensure scores are between 25 and 100
    for m in matched:
        assert 25 <= m["match_score"] <= 100
        assert "why_match" in m
        assert len(m["matched_skills"]) > 0


def test_recruiter_create_job(client, recruiter_auth_headers):
    response = client.post(
        "/api/v1/recruiter/jobs",
        json={
            "title": "Autonomous Agent Research Engineer",
            "company": "Google DeepMind",
            "location": "London / Remote",
            "workplace_type": "Remote",
            "employment_type": "Full-time",
            "experience_level": "Mid to Senior",
            "salary_range": "£130,000 - £170,000",
            "description": "Design frontier reinforcement learning and reasoning agents with tool usage capabilities.",
            "category": "AI/ML",
            "logo_color": "#8B5CF6",
            "required_skills": ["Python Systems & Vectorization", "Deep Learning & PyTorch"],
            "preferred_skills": ["Distributed Systems"]
        },
        headers=recruiter_auth_headers
    )
    assert response.status_code == 201
    job = response.json()
    assert job["title"] == "Autonomous Agent Research Engineer"
    assert job["recruiter_id"] is not None


def test_student_apply_and_recruiter_update(client, student_auth_headers, recruiter_auth_headers):
    # Student applies to job 1
    apply_res = client.post(
        "/api/v1/applications",
        json={"job_id": 1, "cover_note": "Excited to apply with deep transformer research experience."},
        headers=student_auth_headers
    )
    assert apply_res.status_code == 201
    app_data = apply_res.json()
    app_id = app_data["id"]
    assert app_data["status"] == "SUBMITTED"

    # Recruiter reviews and shortlists application
    status_res = client.patch(
        f"/api/v1/recruiter/applications/{app_id}/status",
        json={"status": "SHORTLISTED"},
        headers=recruiter_auth_headers
    )
    assert status_res.status_code == 200
    assert status_res.json()["status"] == "SHORTLISTED"
