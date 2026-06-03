from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AssistantRequest(BaseModel):
    message: str
    language: str = "en"

class AssistantResponse(BaseModel):
    answer: str
    confidence: str
    official_terms: list[str]

@router.post("/ask", response_model=AssistantResponse)
def ask_assistant(payload: AssistantRequest):
    # Replace this placeholder with RAG + tax rules + guarded LLM response.
    if payload.language == "tr":
        return AssistantResponse(
            answer="Bu bir başlangıç cevabıdır. UK tax kuralları için doğrulanmış kaynaklar ve rules engine kullanılmalıdır.",
            confidence="low",
            official_terms=["Self Assessment", "allowable expenses", "HMRC"]
        )

    return AssistantResponse(
        answer="This is a starter response. Production answers should use verified UK tax sources and the rules engine.",
        confidence="low",
        official_terms=["Self Assessment", "allowable expenses", "HMRC"]
    )
