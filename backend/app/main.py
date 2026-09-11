from fastapi import FastAPI
from app.rag.rag_chain import ask_rag

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

@app.get("/test-rag")
def test_rag():
    answer = ask_rag("What is FastAPI?")

    return {
        "answer": answer
    }