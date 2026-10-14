def test_login_success(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "student@careerbridge.ai", "password": "student123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["role"] == "STUDENT"
    assert data["name"] == "Alex Rivera"


def test_login_invalid_password(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "student@careerbridge.ai", "password": "wrongpassword"}
    )
    assert response.status_code == 401


def test_register_student_success(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "newstudent@mit.edu",
            "password": "securepassword123",
            "role": "STUDENT",
            "name": "Jordan Lee",
            "university_or_company": "MIT",
            "target_role_or_industry": "Full-Stack Systems Engineer"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newstudent@mit.edu"
    assert data["role"] == "STUDENT"


def test_register_duplicate_email(client):
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "student@careerbridge.ai",
            "password": "password123",
            "role": "STUDENT",
            "name": "Alex Duplicate"
        }
    )
    assert response.status_code == 409


def test_get_current_user(client, student_auth_headers):
    response = client.get("/api/v1/auth/me", headers=student_auth_headers)
    assert response.status_code == 200
    assert response.json()["email"] == "student@careerbridge.ai"
