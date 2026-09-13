from app.rag.vector_store import vector_store
from app.gemini.client import llm, extract_text


def ask_youtube(question: str, video_id: str):

    # Retrieve relevant chunks only from the selected YouTube video
    results = vector_store.similarity_search(
        question,
        k=6,
        filter={
            "$and": [
                {"source": "youtube"},
                {"video_id": video_id},
            ]
        },
    )

    # No relevant transcript context found
    if not results:
        return (
            "I couldn't find enough relevant information in "
            "the transcript to answer that question."
        )

    context = "\n\n".join(
        doc.page_content
        for doc in results
    )

    prompt = f"""
You are an AI assistant answering questions about a YouTube video.

Your job is to answer the user's question using ONLY the transcript
context provided below.

Transcript context:
{context}

User question:
{question}

Instructions:

- Carefully read ALL of the transcript context before answering.
- Combine information from multiple transcript sections when necessary.
- Answer the exact question the user asked.
- Give a direct and natural answer.
- Do not mention "retrieved chunks", "context", embeddings, or RAG.
- Do not unnecessarily start with phrases like "Based on the transcript".
- Do not invent facts that are not supported by the transcript.
- If the transcript genuinely does not contain enough information,
  clearly say that the transcript does not provide enough information.
- Keep the answer concise but informative.
"""

    response = llm.invoke(prompt)

    return extract_text(response)