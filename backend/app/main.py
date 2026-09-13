from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from app.rag.loader import load_pdf
from app.rag.splitter import split_documents
from app.rag.vector_store import vector_store
from app.rag.document_state import set_document_uploaded

from app.router.ai_router import ask_ai
from app.youtube.transcript import (
    get_transcript,
    get_video_id,
)

from app.youtube.rag import store_youtube_transcript
from app.youtube.qa import ask_youtube

from app.schemas import (
    YouTubeProcessRequest,
    YouTubeChatRequest,
)


app = FastAPI(
    title="RAG AI Assistant",
    description="AI Assistant with RAG, web search, and YouTube AI",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "RAG AI backend is running 🚀",
    }
@app.post("/chat")
async def chat(
    question: str = Form(...),
    file: UploadFile | None = File(None),
):

    if file is not None:

        file_path = f"uploads/{file.filename}"

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        documents = load_pdf(file_path)

        chunks = split_documents(documents)

        for chunk in chunks:
            chunk.metadata["filename"] = file.filename

        vector_store.add_documents(chunks)

        set_document_uploaded(True)

    answer = ask_ai(
        question,
        use_rag=file is not None,
        filename=file.filename if file is not None else None,
    )

    return {
        "question": question,
        "answer": answer,
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