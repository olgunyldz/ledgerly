from typing import Literal

from pydantic import BaseModel, Field


class RetrievalSource(BaseModel):
    title: str
    source_type: Literal["govuk", "hmrc", "internal_policy", "accountant_reviewed"]
    url: str | None = None
    tax_year: str | None = None
    retrieved_at: str | None = None


class AssistantMessageRequest(BaseModel):
    conversation_id: str | None = None
    message: str = Field(..., min_length=1)
    language: Literal["en", "tr"] = "en"


class AssistantMessageResponse(BaseModel):
    message_id: str
    conversation_id: str
    answer: str
    language: Literal["en", "tr"]
    risk_level: Literal["low", "medium", "high"]
    prompt_version: str
    sources: list[RetrievalSource]
    suggested_actions: list[str]
    escalation_required: bool
    refused: bool
