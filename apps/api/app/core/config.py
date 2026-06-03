from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "TaxBridge AI"
    environment: str = "development"
    api_version: str = "v1"


settings = Settings()
