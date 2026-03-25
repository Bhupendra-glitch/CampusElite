from app.config.database import get_db
from app.config.auth import hash_password, verify_password, create_access_token

async def register_user(user_data: dict):
    db = get_db()

    existing = await db.users.find_one({"email": user_data["email"]})
    if existing:
        return None

    user_data["password"] = hash_password(user_data["password"])
    result = await db.users.insert_one(user_data)

    return str(result.inserted_id)

async def login_user(user_data: dict):
    db = get_db()

    user = await db.users.find_one({"email": user_data["email"]})
    
    if not user:
        return None

    if not verify_password(user_data["password"], user["password"]):
        return None

    token = create_access_token({"user_id": str(user["_id"])})

    return token
