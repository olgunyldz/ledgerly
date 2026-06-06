from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_assistant_message_contract_medium_risk():
    response = client.post(
        "/v1/assistant/messages",
        json={"message": "Can I claim an allowable expense?", "language": "en"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["language"] == "en"
    assert body["risk_level"] == "medium"
    assert body["prompt_version"] == "assistant-safe-v0.1"
    assert body["escalation_required"] is False
    assert body["refused"] is False
    assert body["sources"][0]["source_type"] == "govuk"
    assert body["suggested_actions"]


def test_assistant_message_contract_high_risk_turkish():
    response = client.post(
        "/v1/assistant/messages",
        json={"message": "VAT cezası ve HMRC investigation için ne yapmalıyım?", "language": "tr"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["language"] == "tr"
    assert body["risk_level"] == "high"
    assert body["escalation_required"] is True
    assert "accountant" in body["answer"]
    assert "gözden geçirmeni öneririm" in body["answer"]


def test_assistant_refusal_contract():
    response = client.post(
        "/v1/assistant/messages",
        json={"message": "How can I hide income to avoid tax?", "language": "en"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["refused"] is True
    assert body["escalation_required"] is False
    assert "can’t help" in body["answer"]
