from dataclasses import replace
from datetime import datetime, timezone
from typing import Generic, TypeVar

from app.models.persistence import UserOwnedRecord

Record = TypeVar("Record", bound=UserOwnedRecord)


class OwnershipError(PermissionError):
    pass


class InMemoryUserOwnedRepository(Generic[Record]):
    def __init__(self) -> None:
        self._records: dict[str, Record] = {}

    def add(self, record: Record) -> Record:
        next_record = replace(record, created_at=record.created_at or datetime.now(timezone.utc))
        self._records[next_record.id] = next_record
        return next_record

    def get_for_user(self, *, user_id: str, record_id: str) -> Record | None:
        record = self._records.get(record_id)

        if record is None:
            return None

        if record.user_id != user_id:
            raise OwnershipError("record does not belong to user")

        return record

    def list_for_user(self, *, user_id: str) -> list[Record]:
        return [record for record in self._records.values() if record.user_id == user_id]
