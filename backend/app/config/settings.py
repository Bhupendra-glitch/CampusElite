from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CampusElite"
    
    # Database
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "campuselite"
    
    # JWT Auth
    SECRET_KEY: str = "your_secret_key_here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Gemini API
    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
