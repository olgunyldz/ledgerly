from dataclasses import dataclass, field
from datetime import datetime
from typing import Any
from uuid import uuid4


@dataclass
class UserOwnedRecord:
    user_id: str
    id: str = field(default_factory=lambda: str(uuid4()))
    created_at: datetime | None = None


@dataclass
class TaxProfileRecord(UserOwnedRecord):
    tax_year: str = "2025-26"
    profile_types: list[str] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class IncomeRecord(UserOwnedRecord):
    tax_year: str = "2025-26"
    amount_minor: int = 0
    source_type: str = "other"
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class ExpenseRecord(UserOwnedRecord):
    tax_year: str = "2025-26"
    amount_minor: int = 0
    category: str = "other"
    business_percentage: int = 100
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class AuditEventRecord(UserOwnedRecord):
    event_type: str = ""
    entity_type: str = ""
    entity_id: str | None = None
    input_hash: str = ""
    rule_version: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)
