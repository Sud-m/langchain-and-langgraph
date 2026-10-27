# Hello World: prompt templates and the first chain

Branch: `project/hello-world` · Code dates: October 13–14, 2026.

**Come back here for:** First `PromptTemplate`, `ChatOpenAI`, LCEL pipe (`|`), and dictionary input to `.invoke()`.

## What changed

Starting point: one prompt and one model call, before tools, retrieval, or graphs.

## Code and flow

- [main.py](main.py): formats a sample biography into a summary prompt, composes `summary_prompt_template | llm`, invokes it with `{"information": information}`, and prints `response.content`.
- Uses GPT-5; a commented `ChatOllama` alternative shows how a local model could replace it.
- The embedded biography is sample input, not a verified factual source.

```text
biography → PromptTemplate → chat model → AIMessage.content
```

`PromptTemplate` supplies reusable placeholders. It does not validate factual accuracy or prevent prompt injection. The two static logo images are branding assets; this branch has no workflow diagram.

## Run

Run from the repository root with Python 3.14+. Dependencies follow this branch's `pyproject.toml`; `--no-install-project` avoids building the exercise's package scaffold.

```bash
uv sync --no-install-project
uv run --no-sync python main.py
```

Local `.env`: `OPENAI_API_KEY`.

## Place in the practice sequence

Next topic: [search-agent](https://github.com/Sud-m/langchain/tree/search-agent) · [Full learning timeline](https://github.com/Sud-m/langchain/blob/mcp-practice/README.md)

Dates reflect code commits before this README update, not branch creation times. Comparisons follow the learning sequence, not necessarily Git ancestry. Practice based on Eden Marco's LangChain/LangGraph course.
