import os

from dotenv import load_dotenv
from tavily import TavilyClient


load_dotenv()

tavily_client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)


def search_web(query: str):
    response = tavily_client.search(
        query=query,
        search_depth="basic",
        max_results=5,
    )

    return response