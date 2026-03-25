from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config.auth import verify_token

security = HTTPBearer()

# Dependency function
def get_current_user(credentials: HTTPAuthorizationCredentials = security):
    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return payload  # contains user_id
