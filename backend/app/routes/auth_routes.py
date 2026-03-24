from fastapi import APIRouter, HTTPException
from app.config.database import get_db
from app.config.auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
async def register(user: dict):
    db = get_db()

    existing = await db.users.find_one({"email": user["email"]})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user["password"] = hash_password(user["password"])
    await db.users.insert_one(user)

    return {"message": "User registered successfully"}

@router.post("/login")
async def login(user: dict):
    db = get_db()

    db_user = await db.users.find_one({"email": user["email"]})
    if not db_user or not verify_password(user["password"], db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": str(db_user["_id"])})

    return {"access_token": token}
