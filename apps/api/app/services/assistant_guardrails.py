from uuid import uuid4

from app.schemas.assistant import AssistantMessageRequest, AssistantMessageResponse, RetrievalSource

ASSISTANT_SYSTEM_PROMPT_VERSION = "assistant-safe-v0.1"

HIGH_RISK_KEYWORDS = {
    "capital gains",
    "domicile",
    "hmrc investigation",
    "ir35",
    "penalty",
    "residence",
    "vat",
    "yüksek tutar",
    "ceza",
    "soruşturma",
}

REFUSAL_KEYWORDS = {
    "avoid tax",
    "hide income",
    "guaranteed",
    "tax avoidance",
    "gelir gizle",
    "vergiden kaç",
    "garanti",
}


APPROVED_STARTER_SOURCES = [
    RetrievalSource(
        title="GOV.UK Self Assessment",
        source_type="govuk",
        url="https://www.gov.uk/self-assessment-tax-returns",
    ),
    RetrievalSource(
        title="GOV.UK Expenses if you're self-employed",
        source_type="govuk",
        url="https://www.gov.uk/expenses-if-youre-self-employed",
    ),
]


def classify_risk(message: str) -> str:
    normalised_message = message.lower()

    if any(keyword in normalised_message for keyword in HIGH_RISK_KEYWORDS):
        return "high"

    if any(keyword in normalised_message for keyword in ["expense", "allowable", "deduct", "gider", "masraf"]):
        return "medium"

    return "low"


def should_refuse(message: str) -> bool:
    normalised_message = message.lower()
    return any(keyword in normalised_message for keyword in REFUSAL_KEYWORDS)


def build_assistant_response(payload: AssistantMessageRequest) -> AssistantMessageResponse:
    risk_level = classify_risk(payload.message)
    conversation_id = payload.conversation_id or str(uuid4())
    escalation_required = risk_level == "high"
    refused = should_refuse(payload.message)

    if payload.language == "tr":
        if refused:
            answer = "Bu konuda yardımcı olamam. Ledgerly vergi kaçınması, gelir gizleme veya garantili vergi sonucu önermez."
        else:
            answer = (
                "Ledgerly şu anda güvenli başlangıç modunda. Genel kayıt tutma sorularında yardımcı olur, "
                "resmi İngilizce tax terimlerini görünür tutar ve hesaplama gerektiğinde deterministik kuralları kullanmalıdır."
            )
        suggested_actions = [
            "Gelir ve gider kayıtlarını güncel tut.",
            "Kaynak chip’lerini kontrol et.",
            "Yüksek riskli durumlarda muhasebeciye danış.",
        ]
        if escalation_required and not refused:
            answer += " Bu konu yüksek riskli görünüyor; bir accountant ile gözden geçirmeni öneririm."
    else:
        if refused:
            answer = "I can’t help with that. Ledgerly does not provide tax avoidance, hidden income or guaranteed tax outcome guidance."
        else:
            answer = (
                "Ledgerly is in safe starter mode. It can help with general record-keeping questions, "
                "keeps official English tax terms visible, and must use deterministic rules when calculations are needed."
            )
        suggested_actions = [
            "Keep income and expense records up to date.",
            "Check the source chips before relying on guidance.",
            "Ask an accountant to review high-risk situations.",
        ]
        if escalation_required and not refused:
            answer += " This looks high risk, so accountant review is recommended."

    return AssistantMessageResponse(
        message_id=str(uuid4()),
        conversation_id=conversation_id,
        answer=answer,
        language=payload.language,
        risk_level=risk_level,
        prompt_version=ASSISTANT_SYSTEM_PROMPT_VERSION,
        sources=APPROVED_STARTER_SOURCES,
        suggested_actions=suggested_actions,
        escalation_required=escalation_required,
        refused=refused,
    )
