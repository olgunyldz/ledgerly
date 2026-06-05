from app.models.persistence import AuditEventRecord
from app.repositories.base import InMemoryUserOwnedRepository


class AuditEventRepository(InMemoryUserOwnedRepository[AuditEventRecord]):
    pass


audit_event_repository = AuditEventRepository()
