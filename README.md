# First RAG: ingestion, retrieval, and LCEL

Branch: `rag-first` · Code dates: October 17–18, 2026.

**Come back here for:** First embeddings, Pinecone retrieval, document chunking, `RunnablePassthrough.assign`, and `StrOutputParser`.

## What changed

Compared with tool-driven agents, this is a fixed workflow: retrieve once, insert context, then generate once.

## Code and flow

- [ingestion.py](ingestion.py): loads [blog.txt](blog.txt), splits it into 1,000-character chunks with zero overlap, embeds them, and writes them to Pinecone when run as a script.
- [main.py](main.py): retrieves the top three chunks and shows the same RAG flow both step by step and as an LCEL chain.
- `itemgetter("question") | retriever | format_docs` computes the context. `RunnablePassthrough.assign` keeps the original question and adds that context before the prompt/model/parser stages.

```text
question → retriever → formatted context → ChatPromptTemplate → LLM → string
```

`k=3` means three nearest chunks, not three guaranteed relevant sources. The model cannot request extra retrieval in this fixed chain. Running ingestion writes vectors; configure the target index first. No graph image is checked in.

## Run

Run from the repository root with Python 3.14+. Dependencies follow this branch's `pyproject.toml`; `--no-install-project` avoids building the exercise's package scaffold.

```bash
uv sync --no-install-project
uv run --no-sync python ingestion.py
uv run --no-sync python main.py
```

Local `.env`: `OPENAI_API_KEY`, `PINECONE_API_KEY`, and `INDEX_NAME`; an existing Pinecone index compatible with the embedding model.

## Place in the practice sequence

Previous topic: [agents-under-the-hood](https://github.com/Sud-m/langchain/tree/agents-under-the-hood) · Next topic: [doc-assistant](https://github.com/Sud-m/langchain/tree/doc-assistant) · [Full learning timeline](https://github.com/Sud-m/langchain/blob/mcp-practice/README.md)

Dates reflect code commits before this README update, not branch creation times. Comparisons follow the learning sequence, not necessarily Git ancestry. Practice based on Eden Marco's LangChain/LangGraph course.
