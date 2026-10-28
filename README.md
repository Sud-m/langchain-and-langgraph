# MCP practice

MCP (Model Context Protocol) lets clients discover and use tools exposed by a separate server.

What we did:

- Created a server with tools, a resource, and a prompt.
- Used the MCP SDK to discover tool schemas and call a tool directly.
- Used `MCPAdapter` to make MCP tools available to LangChain.
- Connected those tools to `create_agent` so the model could choose and make multiple calls.
- Practiced stdio (client starts the server) and Streamable HTTP (connect to a running server).

Unlike our earlier examples, the tool functions now execute in a separate MCP server.
