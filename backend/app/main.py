from fastapi import FastAPI, UploadFile, File

from app.rag.loader import load_pdf
from app.rag.splitter import split_documents
from app.rag.vector_store import vector_store
from app.router.ai_router import ask_ai

from app.schemas import ChatRequest, YouTubeProcessRequest, YouTubeChatRequest

from app.youtube.transcript import (
    get_transcript,
    get_video_id,
)

from app.youtube.rag import store_youtube_transcript
from app.youtube.qa import ask_youtube

app = FastAPI(
    title="RAG AI Assistant",
    description="AI Assistant with RAG, web search, and YouTube AI",
)


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "RAG AI backend is running 🚀",
    }


@app.post("/chat")
def chat(request: ChatRequest):

    answer = ask_ai(request.question)

    return {
        "question": request.question,
        "answer": answer,
    }


@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    documents = load_pdf(file_path)

    chunks = split_documents(documents)

    for chunk in chunks:
        chunk.metadata["filename"] = file.filename

    vector_store.add_documents(chunks)

    return {
        "filename": file.filename,
        "pages": len(documents),
        "chunks": len(chunks),
        "message": "Document uploaded and stored successfully",
    }


@app.post("/youtube/process")
def process_youtube(request: YouTubeProcessRequest):

    video_id = get_video_id(request.url)

    transcript = get_transcript(request.url)

    result = store_youtube_transcript(
        transcript,
        video_id,
    )

    return {
        "message": "YouTube video processed successfully",
        "video_id": video_id,
        "chunks": result["chunks"],
    }

@app.post("/youtube/chat")
def youtube_chat(request: YouTubeChatRequest):

    answer = ask_youtube(
        request.question,
        request.video_id,
    )

    return {
        "video_id": request.video_id,
        "question": request.question,
        "answer": answer,
    }