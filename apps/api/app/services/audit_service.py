from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any


@dataclass
class AuditEvent:
    event_type: str
    entity_type: str
    entity_id: str | None
    metadata: dict[str, Any]
    created_at: datetime


def build_audit_event(
    *, event_type: str, entity_type: str, entity_id: str | None, metadata: dict[str, Any]
) -> AuditEvent:
    return AuditEvent(
        event_type=event_type,
        entity_type=entity_type,
        entity_id=entity_id,
        metadata=metadata,
        created_at=datetime.now(timezone.utc),
    )
