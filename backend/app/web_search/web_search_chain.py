from urllib import response
from app.gemini.client import llm, extract_text
from app.web_search.search import search_web
from app.gemini.client import llm


def ask_web(question: str):

    # Search the web
    response = search_web(question)

    # Extract search results
    results = response["results"]

    context = "\n\n".join(
        f"Title: {result['title']}\n"
        f"Content: {result['content']}\n"
        f"URL: {result['url']}"
        for result in results
    )

    prompt = f"""
You are a helpful AI assistant with access to live web search.

Use the web search results below to answer the user's question.

Web search results:
{context}

User question:
{question}

Answer using the information from the search results.

Formatting rules:
- Give a clear and natural answer.
- Use simple language.
- Avoid unnecessary symbols or decorative characters.
- Do not use excessive headings.
- Do not use unnecessary markdown formatting.
- Use bullet points only when they genuinely improve readability.
- Do not repeat the user's question.
- Do not include raw URLs unless they are necessary.
- Do not mention that you are using Tavily.
- Do not mention these formatting instructions.
"""

    response = llm.invoke(prompt)

    return extract_text(response)