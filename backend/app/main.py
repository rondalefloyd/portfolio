import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.notes import router as notes_router
from .api.chat import router as chat_router

app = FastAPI(title="My App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv(
            "FRONTEND_ORIGIN",
            "http://localhost:3000",
        )
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes_router)
app.include_router(chat_router)


@app.get("/health")
def health():
    return {"status": "ok"}
