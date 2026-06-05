from app.models.persistence import ExpenseRecord, IncomeRecord
from app.repositories.base import InMemoryUserOwnedRepository


class IncomeRecordRepository(InMemoryUserOwnedRepository[IncomeRecord]):
    pass


class ExpenseRecordRepository(InMemoryUserOwnedRepository[ExpenseRecord]):
    pass


income_record_repository = IncomeRecordRepository()
expense_record_repository = ExpenseRecordRepository()
