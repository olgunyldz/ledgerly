from fastapi import APIRouter

from app.schemas.assistant import AssistantMessageRequest, AssistantMessageResponse
from app.services.assistant_guardrails import build_assistant_response

router = APIRouter()


@router.post("/messages", response_model=AssistantMessageResponse)
def create_assistant_message(payload: AssistantMessageRequest):
    return build_assistant_response(payload)
