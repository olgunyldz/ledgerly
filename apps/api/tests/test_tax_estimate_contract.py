from fastapi.testclient import TestClient

from app.main import app
from app.repositories.audit_events import audit_event_repository

client = TestClient(app)


def test_tax_estimate_contract_persists_audit_payload():
    response = client.post(
        "/v1/tax-estimates",
        headers={"X-Ledgerly-User-Id": "user-contract-1"},
        json={
            "tax_year": "2025-26",
            "income": 40000,
            "expenses": 8000,
            "profile_type": "self_employed",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["tax_year"] == "2025-26"
    assert body["rule_version"] == "2025-26.0"
    assert body["taxable_profit"] == 32000
    assert body["estimate"]["estimated_income_tax"] == 3886
    assert body["estimate"]["estimated_class4_national_insurance"] == 1165.8
    assert body["total_estimate"] == 5051.8
    assert body["audit_event"]["event_type"] == "tax_estimate.calculated"
    assert body["audit_event"]["rule_version"] == "2025-26.0"
    assert len(body["audit_event"]["input_hash"]) == 64

    persisted_events = audit_event_repository.list_for_user(user_id="user-contract-1")
    assert persisted_events
    assert persisted_events[-1].input_hash == body["audit_event"]["input_hash"]


def test_tax_estimate_requires_user_context_error_contract():
    response = client.post(
        "/v1/tax-estimates",
        json={
            "tax_year": "2025-26",
            "income": 40000,
            "expenses": 8000,
            "profile_type": "self_employed",
        },
    )

    assert response.status_code == 401
    assert response.json() == {
        "code": "unauthenticated",
        "message_key": "error.unauthenticated",
        "detail": "missing user context",
    }


def test_tax_estimate_validation_error_contract():
    response = client.post(
        "/v1/tax-estimates",
        headers={"X-Ledgerly-User-Id": "user-contract-2"},
        json={
            "tax_year": "2025-26",
            "income": 100,
            "expenses": 200,
            "profile_type": "self_employed",
        },
    )

    assert response.status_code == 422
    body = response.json()
    assert body["code"] == "validation_error"
    assert body["message_key"] == "error.validation"
    assert body["detail"]
