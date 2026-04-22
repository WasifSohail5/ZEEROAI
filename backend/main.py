from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from contextlib import asynccontextmanager

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from lecture import generate_lecture_core

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(title="Zeero AI Lecture Generator API", lifespan=lifespan)

# Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, set to your frontend domain
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

@app.post("/api/generate-lecture", response_model=LectureResponse)
async def generate_lecture(request: LectureRequest, background_tasks: BackgroundTasks):
    try:
        # In a real app we might want to return an ID and track status,
        # but here we'll just run it as a background task. 
        # Output filename could be randomized or based on topic later.
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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)