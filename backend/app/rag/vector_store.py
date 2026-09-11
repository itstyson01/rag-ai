from langchain_chroma import Chroma

from app.rag.embeddings import embeddings


vector_store = Chroma(
    collection_name="rag_documents",
    embedding_function=embeddings,
    persist_directory="./chroma_db",
)