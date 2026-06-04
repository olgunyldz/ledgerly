from fastapi import FastAPI
from app.routers import assistant, tax_estimate

app = FastAPI(title="Ledgerly API", version="0.1.0")

app.include_router(assistant.router, prefix="/assistant", tags=["assistant"])
app.include_router(tax_estimate.router, prefix="/tax-estimate", tags=["tax-estimate"])

@app.get("/health")
def health():
    return {"status": "ok", "service": "ledgerly-api"}
