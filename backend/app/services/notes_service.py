from app.services.gemini_service import generate_response

def generate_notes(topic: str):
    prompt = f"Generate structured notes for {topic} with headings and bullet points"
    return generate_response(prompt)
