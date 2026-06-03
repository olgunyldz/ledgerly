from pydantic import BaseModel, Field


class TaxEstimateRequest(BaseModel):
    tax_year: str = Field(..., examples=["2026-27"])
    income: float = Field(..., ge=0)
    expenses: float = Field(0, ge=0)
    profile_type: str = Field("self_employed")


class TaxEstimateResponse(BaseModel):
    tax_year: str
    rule_version: str
    taxable_profit: float
    total_estimate: float
    assumptions: list[str]
