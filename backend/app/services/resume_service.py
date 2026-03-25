from app.services.gemini_service import generate_response

def generate_resume(data: dict):
    prompt = f"""
    Create a professional resume with:
    Name: {data.get('name')}
    Skills: {data.get('skills')}
    Education: {data.get('education')}
    Experience: {data.get('experience')}
    """

    return generate_response(prompt)
