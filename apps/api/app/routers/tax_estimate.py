from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()

class TaxEstimateRequest(BaseModel):
    annual_profit: float = Field(ge=0)
    tax_year: str = "2026/27"

class TaxEstimateResponse(BaseModel):
    annual_profit: float
    estimated_tax_to_set_aside: float
    note: str

@router.post("/self-employed", response_model=TaxEstimateResponse)
def estimate_self_employed_tax(payload: TaxEstimateRequest):
    # Placeholder only. Replace with authoritative UK tax bands and NI rules.
    suggested_reserve = payload.annual_profit * 0.25
    return TaxEstimateResponse(
        annual_profit=payload.annual_profit,
        estimated_tax_to_set_aside=round(suggested_reserve, 2),
        note="Placeholder estimate only. Implement official tax-year rules before production use."
    )
