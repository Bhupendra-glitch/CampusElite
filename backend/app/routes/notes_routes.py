from fastapi import APIRouter
from app.services.gemini_service import generate_response
from app.config.database import get_db

router = APIRouter()

@router.post("/generate")
async def generate_notes(data: dict):
    db = get_db()

    topic = data.get("topic")

    prompt = f"Generate detailed notes on {topic}"
    notes = generate_response(prompt)

    await db.notes.insert_one({
        "user_id": data.get("user_id"),
        "topic": topic,
        "content": notes
    })

    return {"notes": notes}
