from urllib import response
from app.gemini.client import llm, extract_text
from app.rag.retriever import retriever
from app.gemini.client import llm
from app.memory.chat_memory import (
    add_message,
    get_history_text,
)


def ask_rag(question: str):

    # Retrieve relevant document chunks
    results = retriever.invoke(question)

    context = "\n\n".join(
        doc.page_content
        for doc in results
    )

    # Get previous conversation
    history = get_history_text()

    prompt = f"""
You are a helpful AI assistant.

Use the conversation history and relevant document context to answer the user's question.

Previous conversation:
{history}

Relevant document context:
{context}

Current question:
{question}

Formatting rules:
- Give a clear and natural answer.
- Use simple language.
- Avoid unnecessary symbols or decorative characters.
- Do not use excessive headings.
- Do not use unnecessary markdown formatting.
- Use bullet points only when they genuinely improve readability.
- Do not repeat the user's question.
- Keep the answer focused.
- If the document context does not contain enough information, say so rather than inventing information.
"""

    response = llm.invoke(prompt)

    answer = extract_text(response)

    # Save conversation
    add_message("user", question)
    add_message("assistant", answer)

    return answer