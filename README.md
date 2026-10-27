# LangChain / LangGraph practice: learning timeline

A quick map of what was implemented, where concepts first appeared, and which branch to revisit. The linked branch READMEs contain file pointers, run instructions, diagrams, and snapshot-specific limitations.

Dates below come from code commits in America/Phoenix time, excluding README-only edits. Branches are often independent snapshots; “previous” means the previous learning topic, not necessarily the Git parent.

## Branches in date order

| Code dates (2026) | Branch | What to revisit |
| --- | --- | --- |
| October 13–14, 2026 | [project/hello-world](https://github.com/Sud-m/langchain/tree/project/hello-world) | PromptTemplate, LCEL, invoke, AIMessage |
| October 14, 2026 | [search-agent](https://github.com/Sud-m/langchain/tree/search-agent) | create_agent, Tavily, Pydantic answer + sources |
| October 14–17, 2026 | [agents-under-the-hood](https://github.com/Sud-m/langchain/tree/agents-under-the-hood) | Manual tool loop, schemas, ToolMessage, raw ReAct |
| October 17–18, 2026 | [rag-first](https://github.com/Sud-m/langchain/tree/rag-first) | Embeddings, Pinecone, fixed RAG, runnable composition |
| October 20–21, 2026 | [doc-assistant](https://github.com/Sud-m/langchain/tree/doc-assistant) | Async ingestion, agentic RAG, artifacts, Streamlit |
| October 22, 2026 | [langgraph](https://github.com/Sud-m/langchain/tree/langgraph) | First StateGraph, MessagesState, nodes, ToolNode, edges |
| October 23, 2026 (morning) | [reflection-agent](https://github.com/Sud-m/langchain/tree/reflection-agent) | Generate/critique loop, MessagesPlaceholder, add_messages |
| October 23, 2026 (afternoon/evening) | [reflexion-agent](https://github.com/Sud-m/langchain/tree/reflexion-agent) | Structured research/revision, partial prompts, tool executor |
| October 26, 2026 (11:46) | [agent-rag](https://github.com/Sud-m/langchain/tree/agent-rag) | Modular graph, relevance grader, corrective web search |
| October 26, 2026 (12:02–13:25) | [self-rag](https://github.com/Sud-m/langchain/tree/self-rag) | Grounding/usefulness graders, regeneration and search loops |
| October 27, 2026 | [adaptive-rag](https://github.com/Sud-m/langchain/tree/adaptive-rag) | Conditional entry, structured datasource router, safe missing-state handling |
| Current scaffold; no prior code commit | `mcp-practice` (this branch) | Learning index; MCP implementation has not started |

## Where did we first do this?

- **Prompt templates, LCEL `|`, dictionary `.invoke()`:** `project/hello-world`.
- **Agent-managed tools and Pydantic output:** `search-agent`.
- **Manual tool dispatch, tool schemas, and `ToolMessage`:** `agents-under-the-hood`.
- **Embeddings, chunking, Pinecone retrieval, runnable composition:** `rag-first`.
- **Concurrent site ingestion, retriever artifacts, chat UI:** `doc-assistant`.
- **Explicit graph nodes, state, edges, conditional tool loop:** `langgraph`.
- **Critique/rewrite roles and message placeholders:** `reflection-agent`.
- **Critique plus research, partial prompts, named tool executors:** `reflexion-agent`.
- **Modular RAG nodes/chains and relevance-based web fallback:** `agent-rag`.
- **Post-generation grounding and answer checks:** `self-rag`.
- **Conditional entry and structured datasource routing:** `adaptive-rag`.

These “firsts” refer to the inspected practice sequence, not the first appearance of a feature in LangChain itself.

## Diagrams

- `langgraph`: [flow.png](https://github.com/Sud-m/langchain/blob/langgraph/flow.png).
- `reflection-agent`, `reflexion-agent`, `agent-rag`, `self-rag`, and `adaptive-rag`: `graph.png` on each branch.
- Each graph branch README includes a Mermaid version of its committed flow. The self-rag README explicitly shows its extra unconditional exit; adaptive-rag fixes it.
- Earlier branches use short text flow diagrams. Static logo assets are not execution graphs.

## Useful distinctions

- **Chain:** application-defined steps. **Agent:** model-directed tool decisions. **Graph:** explicit state and routing for either kind of workflow.
- **Reflection:** critique and rewrite. **Our reflexion exercise:** critique, search, and rewrite using new evidence.
- **Corrective RAG:** assess retrieved chunks before answering. **Self-RAG:** also assess the answer. **Adaptive RAG:** first choose where to obtain evidence.
- `k` counts retrieved chunks, not unique pages or guaranteed relevant results. Grader decisions can be wrong; a successful route is not proof of correctness.

## Current branch: mcp-practice

This branch publishes the learning index only. At the time of this update, the local workspace also has an uncommitted uv scaffold (`pyproject.toml`, `.python-version`, `.gitignore`, and a hello-world package under `src/`). Those files are intentionally left uncommitted by this documentation task. There is no implemented MCP client, server, transport, or tool integration yet, and no MCP graph to run.

## Returning to an exercise

Switch to the branch and read its README. Run commands from the repository root; nested modules use `python -m graph.nodes.web_search`, rather than executing a nested file directly. Branches have different dependencies and local `.env` requirements, so sync the selected branch's environment before running it. Do not copy credentials into documentation.

Practice based on Eden Marco's LangChain/LangGraph course. Summaries describe committed code rather than every intermediate experiment from the course.
