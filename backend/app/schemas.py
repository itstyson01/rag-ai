from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class YouTubeProcessRequest(BaseModel):
    url: str

class YouTubeChatRequest(BaseModel):
    question: str
    video_id: str