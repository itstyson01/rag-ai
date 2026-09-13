from app.gemini.client import llm, extract_text
from app.rag.retriever import get_retriever
from app.memory.chat_memory import (
    add_message,
    get_history_text,
)


def ask_rag(question: str, filename: str):

    # Create a retriever that only searches
    # chunks belonging to the uploaded PDF
    retriever = get_retriever(filename)

    # Retrieve relevant document chunks
    results = retriever.invoke(question)

    context = "\n\n".join(
        doc.page_content
        for doc in results
    )

    # Get previous conversation
    history = get_history_text()

    prompt = f"""
You are a helpful AI assistant answering questions about a specific uploaded document.

Use ONLY the relevant document context below to answer the user's question.

Previous conversation:
{history}

Document context:
{context}

Current question:
{question}

Important rules:
- Answer only from the provided document context.
- Do not use information from other documents.
- Do not use your general knowledge to fill missing information.
- If the document context does not contain enough information, say that the information is not available in the document.
- Give a clear and natural answer.
- Use simple language.
- Do not repeat the user's question.
- Keep the answer focused.
- Use bullet points only when they genuinely improve readability.
"""

    response = llm.invoke(prompt)

    answer = extract_text(response)

    # Save conversation
    add_message("user", question)
    add_message("assistant", answer)

    return answer