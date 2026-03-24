from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

client = None
db = None

def connect_db():
    global client, db
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.DB_NAME]
    print("✅ Connected to MongoDB")

def close_db():
    global client
    if client:
        client.close()
        print("❌ MongoDB connection closed")

def get_db():
    return db
