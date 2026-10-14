def test_get_career_roles(client):
    response = client.get("/api/v1/careers")
    assert response.status_code == 200
    roles = response.json()
    assert len(roles) >= 4
    slugs = [r["slug"] for r in roles]
    assert "ai-ml" in slugs
    assert "full-stack" in slugs


def test_career_intelligence_me(client, student_auth_headers):
    response = client.get("/api/v1/careers/intelligence/me", headers=student_auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert "alignment_score" in data
    assert data["alignment_score"] > 0
    assert "critical_gaps" in data
    assert "radar_axes" in data
    assert len(data["radar_axes"]) > 0
    assert "calculation_basis" in data


def test_get_skill_catalogue(client):
    response = client.get("/api/v1/careers/skills/catalogue")
    assert response.status_code == 200
    skills = response.json()
    assert len(skills) >= 10
    names = [s["name"] for s in skills]
    assert "Python Systems & Vectorization" in names
