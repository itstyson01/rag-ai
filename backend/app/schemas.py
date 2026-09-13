from pydantic import BaseModel


class YouTubeProcessRequest(BaseModel):
    url: str


class YouTubeChatRequest(BaseModel):
    question: str
    video_id: str