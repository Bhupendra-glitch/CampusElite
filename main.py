# Import routes
from backend.app.routes import (
    auth_routes,
    user_routes,
    ai_routes,
    resume_routes,
    interview_routes,
    notes_routes,
    dashboard_routes
)

# CORS (IMPORTANT for frontend connection)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # change to frontend URL in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# ---------------- ROUTES ---------------- #

# app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
# app.include_router(user_routes.router, prefix="/users", tags=["Users"])
# app.include_router(ai_routes.router, prefix="/ai", tags=["AI"])
# app.include_router(resume_routes.router, prefix="/resume", tags=["Resume"])
# app.include_router(interview_routes.router, prefix="/interview", tags=["Interview"])
# app.include_router(notes_routes.router, prefix="/notes", tags=["Notes"])
# app.include_router(dashboard_routes.router, prefix="/dashboard", tags=["Dashboard"])

# ---------------- ROOT ---------------- #

# @app.get("/")
# def root():
#     return {
#         "message": "CampusElite Backend Running 🚀",
#         "status": "success"
#     }

# ---------------- HEALTH CHECK ---------------- #

# @app.get("/health")
# def health_check():
#     return {
#         "status": "healthy",
#         "service": "CampusElite API"
#     }

# ---------------- STARTUP EVENT ---------------- #

# @app.on_event("startup")
# def startup_event():
#     print("🚀 CampusElite backend started successfully")

# ---------------- SHUTDOWN EVENT ---------------- #

# @app.on_event("shutdown")
# def shutdown_event():
#     print("🛑 CampusElite backend stopped")
