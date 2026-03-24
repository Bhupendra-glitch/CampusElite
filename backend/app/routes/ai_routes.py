from fastapi import APIRouter
from app.services.gemini_service import generate_response

router = APIRouter()

@router.post("/chat")
async def chat(data: dict):
    message = data.get("message")

    response = generate_response(message)

    return {"response": response}
