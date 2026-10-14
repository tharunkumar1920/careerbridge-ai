def test_get_student_roadmap(client, student_auth_headers):
    response = client.get("/api/v1/roadmaps/me", headers=student_auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "milestones" in data
    assert len(data["milestones"]) >= 4
    assert data["progress_percent"] >= 0


def test_update_milestone_status(client, student_auth_headers):
    # Fetch roadmap
    res = client.get("/api/v1/roadmaps/me", headers=student_auth_headers)
    data = res.json()
    roadmap_id = data["id"]
    milestone_id = data["milestones"][1]["id"]

    # Mark milestone completed
    update_res = client.patch(
        f"/api/v1/roadmaps/{roadmap_id}/milestones/{milestone_id}",
        json={"status": "completed"},
        headers=student_auth_headers
    )
    assert update_res.status_code == 200
    updated_data = update_res.json()
    assert updated_data["progress_percent"] > data["progress_percent"]
