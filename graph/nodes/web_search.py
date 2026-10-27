from typing import Any, Dict
from langchain_core.documents import Document
from graph.state import GraphState
from langchain_tavily import TavilySearch
from dotenv import load_dotenv

load_dotenv()
web_search_tool = TavilySearch(max_results=3)


def web_search(state: GraphState) -> Dict[str, Any]:
    print("Web search")
    question = state["question"]
    documents = state.get("documents", None)
    tavily_results = web_search_tool.invoke({"query": question})

    joined_tavily_result = "\n".join([res["content"] for res in tavily_results["results"]])
    web_results = Document(page_content=joined_tavily_result)
    if documents is not None:
        documents.append(web_results)
    else:
        documents = [web_results]
    return {"documents": documents, "question": question}


if __name__ == "__main__":
    web_search(
        state={"question": "how to bake a cake", "documents": None}
    )  # A scenario where we didn't find any relevant documents at all
