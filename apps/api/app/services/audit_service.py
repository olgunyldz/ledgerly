from dataclasses import dataclass
from datetime import datetime, timezone
from hashlib import sha256
import json
from typing import Any


@dataclass
class AuditEvent:
    event_type: str
    entity_type: str
    entity_id: str | None
    input_hash: str
    rule_version: str | None
    metadata: dict[str, Any]
    created_at: datetime


def hash_audit_inputs(inputs: dict[str, Any]) -> str:
    serialised_inputs = json.dumps(inputs, sort_keys=True, separators=(",", ":"))
    return sha256(serialised_inputs.encode("utf-8")).hexdigest()


def build_audit_event(
    *,
    event_type: str,
    entity_type: str,
    entity_id: str | None,
    inputs: dict[str, Any],
    metadata: dict[str, Any],
    rule_version: str | None = None,
) -> AuditEvent:
    return AuditEvent(
        event_type=event_type,
        entity_type=entity_type,
        entity_id=entity_id,
        input_hash=hash_audit_inputs(inputs),
        rule_version=rule_version,
        metadata=metadata,
        created_at=datetime.now(timezone.utc),
    )
