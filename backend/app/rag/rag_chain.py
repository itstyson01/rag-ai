from app.rag.retriever import retriever
from app.gemini.client import llm


def ask_rag(question: str):
    results = retriever.invoke(question)

    return results


def ask_rag(question: str):
    results = retriever.invoke(question)

    context = "\n\n".join(
        doc.page_content
        for doc in results
    )

    prompt = f"""
Use the following context to answer the question.

Context:
{context}

Question:
{question}

Answer based on the context above.
"""

    response = llm.invoke(prompt)

    return response.content