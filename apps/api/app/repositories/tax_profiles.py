from app.models.persistence import TaxProfileRecord
from app.repositories.base import InMemoryUserOwnedRepository


class TaxProfileRepository(InMemoryUserOwnedRepository[TaxProfileRecord]):
    pass


tax_profile_repository = TaxProfileRepository()
