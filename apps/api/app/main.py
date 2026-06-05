from fastapi import FastAPI
from app.core.errors import register_error_handlers
from app.routers import assistant, tax_estimate

app = FastAPI(title="Ledgerly API", version="0.1.0")
register_error_handlers(app)

app.include_router(assistant.router, prefix="/v1/assistant", tags=["assistant"])
app.include_router(tax_estimate.router, prefix="/v1/tax-estimates", tags=["tax-estimate"])

@app.get("/health")
def health():
    return {"status": "ok", "service": "ledgerly-api"}
