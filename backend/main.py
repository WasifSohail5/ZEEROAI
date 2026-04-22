from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from contextlib import asynccontextmanager

import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from lecture import generate_lecture_core

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(title="Zeero AI Lecture Generator API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://zeeroai.vercel.app",        # tumhara Vercel URL — baad mein update karna
        "http://localhost:3000",               # local dev
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LectureRequest(BaseModel):
    topic: str
    sections: List[str]
    template_name: Optional[str] = "swiss"
    user_id: Optional[str] = None

class LectureResponse(BaseModel):
    status: str
    message: str

@app.get("/")
async def root():
    return {"status": "ZEERO AI Backend is running"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/api/generate-lecture", response_model=LectureResponse)
async def generate_lecture(request: LectureRequest, background_tasks: BackgroundTasks):
    try:
        output_filename = f"lecture_{request.topic.replace(' ', '_')}.mp4"
        background_tasks.add_task(
            generate_lecture_core,
            request.topic,
            request.sections,
            request.template_name,
            output_filename,
            request.user_id
        )
        return LectureResponse(
            status="success",
            message=f"Lecture generation for '{request.topic}' started in the background."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Port 7860 for Hugging Face Spaces
    port = int(os.environ.get("PORT", 7860))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)