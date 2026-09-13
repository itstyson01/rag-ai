from app.rag.vector_store import vector_store


def get_retriever(filename: str | None = None):

    search_kwargs = {
        "k": 3
    }

    if filename:
        search_kwargs["filter"] = {
            "filename": filename
        }

    return vector_store.as_retriever(
        search_kwargs=search_kwargs
    )