from pydantic import BaseModel
from typing import List
from datetime import datetime

class Interview(BaseModel):
    user_id: str
    
    role: str
    questions: List[str]
    answers: List[str]
    
    feedback: str  # AI feedback
    
    created_at: datetime = datetime.utcnow()
