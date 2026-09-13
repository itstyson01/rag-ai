from app.gemini.client import llm, extract_text
from app.web_search.web_search_chain import ask_web
from app.rag.rag_chain import ask_rag


def detect_mode(question: str):
    question_lower = question.lower()

    web_keywords = [
        "latest",
        "today",
        "current",
        "news",
        "recent",
        "now",
        "yesterday",
        "this week",
        "this month",
        "who won",
        "score",
    ]

    for keyword in web_keywords:
        if keyword in question_lower:
            return "web"

    return "normal"


def ask_ai(
    question: str,
    use_rag: bool = False,
    filename: str | None = None,
):

    # If a PDF was attached, use RAG
    # with that specific PDF.
    if use_rag and filename:
        return ask_rag(
            question,
            filename,
        )

    mode = detect_mode(question)

    if mode == "web":
        return ask_web(question)

    prompt = f"""
You are a helpful AI assistant.

Answer the user's question clearly, naturally, and directly.

Formatting rules:
- Use simple and clean language.
- Avoid unnecessary symbols or decorative characters.
- Do not use excessive headings.
- Do not use unnecessary markdown formatting.
- Use bullet points only when they genuinely improve readability.
- Do not repeat the question.
- Keep the answer focused on what the user asked.
- Do not add unnecessary introductory or closing statements.

User question:
{question}
"""

    response = llm.invoke(prompt)

    return extract_text(response)