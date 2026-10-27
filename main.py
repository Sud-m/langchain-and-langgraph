from dotenv import load_dotenv

load_dotenv()
from graph.graph import app

if __name__ == "__main__":
    print("Advanced RAG - CRAG")
    print(
        app.invoke(
            input={
                "question": """How does Lilian Weng describe long-term memory in LLM agents, 
                            and how does the 2025 MemoryGraft paper exploit that design? Explain the connection and include the paper’s URL."""
            }
        )
    )
