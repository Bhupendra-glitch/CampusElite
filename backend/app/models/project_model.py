from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Project(BaseModel):
    title: str
    description: str
    
    tech_stack: List[str]
    
    owner_id: str
    members: Optional[List[str]] = []
    
    status: str = "open"  # open / in-progress / completed
    
    created_at: datetime = datetime.utcnow()
