from fastapi import FastAPI, UploadFile, File
from app.router.ai_router import ask_ai

from app.rag.rag_chain import ask_rag
from app.rag.loader import load_pdf
from app.rag.splitter import split_documents
from app.rag.vector_store import vector_store
from app.web_search.search import search_web
from app.schemas import ChatRequest
from app.web_search.web_search_chain import ask_web
from app.router.ai_router import ask_ai


app = FastAPI(
    title="RAG AI API",
    description="AI-powered Retrieval Augmented Generation API",
    version="1.0.0",
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
        "answer": answer
    }


@app.post("/upload-document")
async def upload_document(file: UploadFile = File(...)):

    # 1. Save uploaded file
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # 2. Load PDF
    documents = load_pdf(file_path)

    # 3. Split document into chunks
    chunks = split_documents(documents)

    # 4. Add metadata to every chunk
    for chunk in chunks:
        chunk.metadata["filename"] = file.filename

    # 5. Store chunks in Chroma
    vector_store.add_documents(chunks)

    return {
        "filename": file.filename,
        "pages": len(documents),
        "chunks": len(chunks),
        "message": "Document uploaded and stored successfully"
    }

