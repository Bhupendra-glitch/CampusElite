from pydantic import BaseModel
from datetime import datetime

class Notes(BaseModel):
    user_id: str
    
    topic: str
    content: str  # AI generated notes
    
    created_at: datetime = datetime.utcnow()
