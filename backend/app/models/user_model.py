from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class User(BaseModel):
    name: str
    email: EmailStr
    password: str
    
    skills: Optional[list[str]] = []
    college: Optional[str] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
