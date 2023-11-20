from fastapi import FastAPI
from api.routers import ws
from fastapi.middleware.cors import CORSMiddleware
# from api import models
# from api.database import engine
import uvicorn


# Initialize a FastAPI instance.
app = FastAPI(title="SketchSync")


# Enable CORS middleware
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database migration
# models.Base.metadata.create_all(bind=engine)

# Index page
@app.get('/')
def index():
    return {
        'message': 'Welcome to SketchSync, a real-time collaborative whiteboard for sketching ideas.'
    }

# Include routes from other router files
app.include_router(ws.router)


# Run uvicorn server
if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
