from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Resume(BaseModel):
    user_id: str
    
    name: str
    education: str
    skills: List[str]
    experience: Optional[str] = None
    
    generated_content: str  # AI output
    
    created_at: datetime = datetime.utcnow()
