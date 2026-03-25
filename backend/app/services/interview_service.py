from app.services.gemini_service import generate_response

def generate_questions(role: str):
    prompt = f"Generate 5 interview questions for {role}"
    return generate_response(prompt)

def generate_feedback(answers: str):
    prompt = f"Evaluate these answers and give feedback:\n{answers}"
    return generate_response(prompt)
