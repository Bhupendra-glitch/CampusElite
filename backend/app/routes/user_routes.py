from fastapi import APIRouter
from app.config.database import get_db

router = APIRouter()

@router.get("/{user_id}")
async def get_user(user_id: str):
    db = get_db()

    user = await db.users.find_one({"_id": user_id})
    if user:
        user["_id"] = str(user["_id"])

    return user
