from fastapi import APIRouter
from app.services.gemini_service import generate_response
from app.config.database import get_db

router = APIRouter()

@router.post("/start")
async def start_interview(data: dict):
    db = get_db()

    role = data.get("role")

    prompt = f"Generate interview questions for {role}"
    questions = generate_response(prompt)

    interview = {
        "user_id": data.get("user_id"),
        "role": role,
        "questions": questions
    }

    await db.interviews.insert_one(interview)

    return {"questions": questions}
