# Agents under the hood: implement the loop yourself

Branch: `agents-under-the-hood` · Code dates: October 14–17, 2026.

**Come back here for:** First explicit tool-dispatch loop, `ToolMessage` pairing, manual tool schemas, and text-based ReAct parsing.

## What changed

Compared with search-agent, the application now implements the loop that `create_agent` previously managed.

## Code and flow

- [Agent_loop_langchain_tool_calling.py](Agent_loop_langchain_tool_calling.py): uses `@tool`, `bind_tools`, a name-to-tool dictionary, and matching `tool_call_id` values. The shopping example looks up a price, then applies a discount.
- [Agent_loop_raw_function_calling.py](Agent_loop_raw_function_calling.py): implements the equivalent with Ollama, explicit JSON tool schemas, and ordinary function calls.
- [Raw_react_prompt.py](Raw_react_prompt.py): describes tools in a prompt, parses `Action` / `Action Input` / `Final Answer`, and appends observations to a scratchpad.

```text
model → requested action → Python tool → observation → model → answer
```

`MAX_ITERATIONS = 3` caps model turns; it does not require exactly three calls. The function-calling examples handle only `tool_calls[0]`, so they are simplified examples, not general multi-tool dispatchers. No graph image is checked in.

## Run

Run from the repository root with Python 3.14+. Dependencies follow this branch's `pyproject.toml`; `--no-install-project` avoids building the exercise's package scaffold.

```bash
uv sync --no-install-project
uv run --no-sync python Agent_loop_langchain_tool_calling.py
```

Local `.env`: `OPENAI_API_KEY` for the LangChain example. Raw examples require Ollama running locally with the configured `qwen3.5:9b` model. Optional LangSmith tracing uses `LANGSMITH_TRACING`, `LANGSMITH_API_KEY`, and `LANGSMITH_PROJECT`.

## Place in the practice sequence

Previous topic: [search-agent](https://github.com/Sud-m/langchain/tree/search-agent) · Next topic: [rag-first](https://github.com/Sud-m/langchain/tree/rag-first) · [Full learning timeline](https://github.com/Sud-m/langchain/blob/mcp-practice/README.md)

Dates reflect code commits before this README update, not branch creation times. Comparisons follow the learning sequence, not necessarily Git ancestry. Practice based on Eden Marco's LangChain/LangGraph course.
