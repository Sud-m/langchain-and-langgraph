# MCP practice

Practice connecting Python tools to clients and LangChain agents using the MCP SDK and `langchain.mcp`.

## What we practiced

- **Server:** register tools, a resource, and a prompt with `MCPServer`.
- **Direct SDK client:** discover tools and call `add` explicitly using `Client` and `StdioServerParameters`.
- **LangChain adapter:** convert MCP tool schemas into LangChain tools with `MCPAdapter`.
- **Agent:** use `create_agent` to let the model choose tools and continue calling them until it answers.
- **Transports:** stdio launches a local server subprocess; Streamable HTTP connects to a separately running server.

Compared with the earlier tool-loop exercises, the tool functions now run in a separate MCP server. The agent still decides which calls to make; MCP carries the requests and results.

## Examples

| File | Purpose |
| --- | --- |
| `servers/practice_server.py` | `add`, placeholder `search_books`, `greeting://{name}` resource, and `summarize` prompt |
| `sdk_client.py` | Launch the server over stdio, print tool schemas, and call `add(12, 14)` without an LLM |
| `practice_client.py` | Launch over stdio and let an agent perform dependent additions; print its messages |
| `main.py` | Connect an agent to `http://localhost:8000/mcp` |

## Run locally

Run commands from the repository root. These commands describe the local examples; the client/server changes are currently uncommitted.

```bash
uv sync
```

For either agent example, set `OPENAI_API_KEY` in a local `.env` file.

Direct MCP call, with no LLM:

```bash
uv run sdk_client.py
```

Agent over stdio; the client starts the server automatically:

```bash
uv run practice_client.py
```

Agent over HTTP; keep the server running in one terminal:

```bash
uv run mcp run servers/practice_server.py --transport streamable-http
```

In another terminal:

```bash
uv run main.py
```

## Remember

- `list_tools()` sends a `ListToolsRequest`; a tool call sends a `CallToolRequest`. These are SDK types, constructed underneath the convenience methods.
- SDK results are typed objects; use `.model_dump_json(indent=2)` to inspect them.
- LangChain tools use `await tool.ainvoke({...})` for asynchronous execution.
- `bind_tools()` lets a model request tools; `create_agent` also manages execution and follow-up model calls.
- An agent can make redundant calls. A fixed workflow gives your code control over the exact sequence.
- `search_books` returns placeholder text, not real catalog results. An MCP prompt returns prompt content; it does not invoke a model.

[LangChain MCP documentation](https://docs.langchain.com/oss/python/langchain/mcp) · [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
