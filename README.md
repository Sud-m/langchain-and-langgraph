# Documentation assistant: ingestion pipeline and chat UI

Branch: `doc-assistant` · Code dates: October 20–21, 2026.

**Come back here for:** First concurrent web ingestion, retriever tool artifacts, and Streamlit chat with source display.

## What changed

Compared with rag-first, retrieval becomes an agent-selected tool, ingestion handles a documentation site, and a chat UI exposes answers and sources.

## Code and flow

- [ingestion.py](ingestion.py): maps URLs with Tavily, extracts batches concurrently, records source metadata, splits at 4,000 characters / 200 overlap, and asynchronously indexes batches. An outer `async with vectorstore` keeps the shared session open.
- [backend/core.py](backend/core.py): `retrieve_context` returns model-readable text plus original `Document` artifacts; `run_llm` flattens those artifacts into its `context` result. The agent may retrieve more than once.
- [main.py](main.py): Streamlit chat, persisted messages, and deduplicated source expanders. The backend receives only the latest prompt; UI history is not passed back as model conversation history.
- [create_index.py](create_index.py) creates a 1,536-dimensional cosine index. [deleterecords.py](deleterecords.py) deletes records; use it only when deliberately clearing the configured index.

```text
Tavily map/extract → source-tagged chunks → embeddings → Pinecone
question → agent ↔ retrieve_context → answer + artifacts → Streamlit sources
```

Tool requests, retrieved chunks, and unique source URLs are different counts. Tavily extraction failures can return error text rather than the expected result dictionary. No graph image is checked in.

## Run

Run from the repository root with Python 3.14+. Dependencies follow this branch's `pyproject.toml`; `--no-install-project` avoids building the exercise's package scaffold.

```bash
uv sync --no-install-project
uv run --no-sync python create_index.py
uv run --no-sync python ingestion.py
uv run --no-sync streamlit run main.py
```

Local `.env`: `OPENAI_API_KEY`, `TAVILY_API_KEY`, `PINECONE_API_KEY`, and `INDEX_NAME`.

## Place in the practice sequence

Previous topic: [rag-first](https://github.com/Sud-m/langchain/tree/rag-first) · Next topic: [langgraph](https://github.com/Sud-m/langchain/tree/langgraph) · [Full learning timeline](https://github.com/Sud-m/langchain/blob/mcp-practice/README.md)

Dates reflect code commits before this README update, not branch creation times. Comparisons follow the learning sequence, not necessarily Git ancestry. Practice based on Eden Marco's LangChain/LangGraph course.
