from fastapi import APIRouter, HTTPException

from app.schemas.tax_estimate import TaxEstimateRequest, TaxEstimateResponse
from app.services.audit_service import build_audit_event
from app.services.tax_rules_service import TaxRulesServiceError, estimate_self_employed_reserve

router = APIRouter()


@router.post("", response_model=TaxEstimateResponse)
def create_tax_estimate(payload: TaxEstimateRequest):
    taxable_profit = round(payload.income - payload.expenses, 2)

    try:
        estimate = estimate_self_employed_reserve(
            annual_profit=taxable_profit,
            tax_year=payload.tax_year,
        )
    except TaxRulesServiceError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    audit_event = build_audit_event(
        event_type="tax_estimate.calculated",
        entity_type="tax_estimate",
        entity_id=None,
        inputs=estimate["inputs_snapshot"],
        rule_version=estimate["rule_version"],
        metadata={
            "tax_year": estimate["tax_year"],
            "rule_version": estimate["rule_version"],
            "sources": estimate["sources"],
            "input_fields": list(estimate["inputs_snapshot"].keys()),
        },
    )

    return TaxEstimateResponse(
        tax_year=estimate["tax_year"],
        rule_version=estimate["rule_version"],
        inputs_snapshot=estimate["inputs_snapshot"],
        taxable_profit=taxable_profit,
        reserve_percent=estimate["reservePercent"],
        estimate={
            "estimated_income_tax": estimate["breakdown"]["estimatedIncomeTax"],
            "estimated_class4_national_insurance": estimate["breakdown"]["estimatedClass4NationalInsurance"],
        },
        total_estimate=estimate["estimatedTaxToSetAside"],
        assumptions=estimate["assumptions"],
        warnings=estimate["warnings"],
        sources=estimate["sources"],
        audit_event={
            "event_type": audit_event.event_type,
            "entity_type": audit_event.entity_type,
            "entity_id": audit_event.entity_id,
            "input_hash": audit_event.input_hash,
            "rule_version": audit_event.rule_version,
            "metadata": audit_event.metadata,
            "created_at": audit_event.created_at.isoformat(),
        },
    )
