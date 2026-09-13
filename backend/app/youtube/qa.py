from app.rag.vector_store import vector_store
from app.gemini.client import llm, extract_text


def ask_youtube(question: str, video_id: str):

    # Search only inside the selected YouTube video
    results = vector_store.similarity_search(
        question,
        k=3,
        filter={
    "$and": [
        {"source": "youtube"},
        {"video_id": video_id},
    ]
}
    )

    context = "\n\n".join(
        doc.page_content
        for doc in results
    )

    prompt = f"""
You are an AI assistant answering questions about a YouTube video.

Use only the transcript context below.

Transcript context:
{context}

User question:
{question}

Rules:
- Answer only from the transcript.
- If the transcript does not contain enough information, say so.
- Do not invent information.
- Keep the answer clear and concise.
"""

    response = llm.invoke(prompt)

    return extract_text(response)