from typing import Annotated

from fastapi import Header, HTTPException


def get_current_user_id(x_ledgerly_user_id: Annotated[str | None, Header()] = None) -> str:
    if not x_ledgerly_user_id:
        raise HTTPException(status_code=401, detail="missing user context")

    return x_ledgerly_user_id
