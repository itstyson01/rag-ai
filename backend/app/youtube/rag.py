from langchain_core.documents import Document

from app.rag.splitter import split_documents
from app.rag.vector_store import vector_store


def store_youtube_transcript(transcript: str, video_id: str):

    # Convert transcript text into a LangChain document
    document = Document(
        page_content=transcript,
        metadata={
            "source": "youtube",
            "video_id": video_id,
        }
    )

    # Split transcript into chunks
    chunks = split_documents([document])

    # Store chunks in ChromaDB
    vector_store.add_documents(chunks)

    return {
        "video_id": video_id,
        "chunks": len(chunks),
    }