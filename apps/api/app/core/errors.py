from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


def error_response(*, status_code: int, code: str, message_key: str, detail):
    return JSONResponse(
        status_code=status_code,
        content={
            "code": code,
            "message_key": message_key,
            "detail": detail,
        },
    )


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(HTTPException)
    async def http_exception_handler(_request: Request, exc: HTTPException):
        code = "http_error"
        message_key = "error.http"

        if exc.status_code == 401:
            code = "unauthenticated"
            message_key = "error.unauthenticated"
        elif exc.status_code == 422:
            code = "validation_error"
            message_key = "error.validation"

        return error_response(
            status_code=exc.status_code,
            code=code,
            message_key=message_key,
            detail=jsonable_encoder(exc.detail),
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(_request: Request, exc: RequestValidationError):
        return error_response(
            status_code=422,
            code="validation_error",
            message_key="error.validation",
            detail=jsonable_encoder(exc.errors()),
        )
