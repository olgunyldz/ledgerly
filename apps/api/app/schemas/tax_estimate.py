from typing import Any, Literal

from pydantic import BaseModel, Field, model_validator


class TaxEstimateRequest(BaseModel):
    tax_year: str = Field(..., examples=["2025-26"])
    income: float = Field(..., ge=0)
    expenses: float = Field(0, ge=0)
    profile_type: Literal["self_employed"] = "self_employed"

    @model_validator(mode="after")
    def validate_profit_inputs(self):
        if self.expenses > self.income:
            raise ValueError("expenses cannot exceed income for this estimate")

        return self


class TaxEstimateBreakdown(BaseModel):
    estimated_income_tax: float
    estimated_class4_national_insurance: float


class AuditEventPayload(BaseModel):
    event_type: str
    entity_type: str
    entity_id: str | None
    metadata: dict[str, Any]
    created_at: str


class TaxEstimateResponse(BaseModel):
    tax_year: str
    rule_version: str
    inputs_snapshot: dict[str, Any]
    taxable_profit: float
    reserve_percent: float
    estimate: TaxEstimateBreakdown
    total_estimate: float
    assumptions: list[str]
    warnings: list[str]
    sources: list[dict[str, Any]]
    audit_event: AuditEventPayload
