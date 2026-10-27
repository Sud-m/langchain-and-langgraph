# Search agent: tools and structured responses

Branch: `search-agent` · Code dates: October 14, 2026.

**Come back here for:** First `create_agent`, Tavily search tool, and Pydantic answer/source schema.

## What changed

Compared with Hello World, the model can fetch external information and return a structured answer instead of only transforming supplied text.

## Code and flow

- [main.py](main.py): defines `Source` and `AgentResponse`, registers `TavilySearch`, and builds `create_agent(..., response_format=AgentResponse)`.
- The sample request searches for AI engineer job postings. [exampleresponse.json](exampleresponse.json) is a saved example, not current job data.
- Agent state contains message history; structured answers belong to the configured response schema. Tool requests and tool results are separate messages.

```text
question → agent/model → Tavily search → model → structured answer + sources
```

The agent owns the tool loop: one `.invoke()` may make multiple model/tool requests. This branch has no checked-in graph image.

## Run

Run from the repository root with Python 3.14+. Dependencies follow this branch's `pyproject.toml`; `--no-install-project` avoids building the exercise's package scaffold.

```bash
uv sync --no-install-project
uv run --no-sync python main.py
```

Local `.env`: `OPENAI_API_KEY` and `TAVILY_API_KEY`.

## Place in the practice sequence

Previous topic: [project/hello-world](https://github.com/Sud-m/langchain/tree/project/hello-world) · Next topic: [agents-under-the-hood](https://github.com/Sud-m/langchain/tree/agents-under-the-hood) · [Full learning timeline](https://github.com/Sud-m/langchain/blob/mcp-practice/README.md)

Dates reflect code commits before this README update, not branch creation times. Comparisons follow the learning sequence, not necessarily Git ancestry. Practice based on Eden Marco's LangChain/LangGraph course.
