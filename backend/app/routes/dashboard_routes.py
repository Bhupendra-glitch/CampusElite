from fastapi import APIRouter
from app.config.database import get_db

router = APIRouter()

@router.get("/{user_id}")
async def get_dashboard(user_id: str):
    db = get_db()

    resumes = await db.resumes.count_documents({"user_id": user_id})
    interviews = await db.interviews.count_documents({"user_id": user_id})
    notes = await db.notes.count_documents({"user_id": user_id})

    return {
        "total_resumes": resumes,
        "total_interviews": interviews,
        "total_notes": notes
    }
