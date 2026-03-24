from fastapi import APIRouter
from app.config.database import get_db
from app.services.gemini_service import generate_response

router = APIRouter()

@router.post("/generate")
async def generate_resume(data: dict):
    db = get_db()

    prompt = f"Create a professional resume for: {data}"
    result = generate_response(prompt)

    resume = {
        "user_id": data.get("user_id"),
        "content": result
    }

    await db.resumes.insert_one(resume)

    return {"resume": result}
