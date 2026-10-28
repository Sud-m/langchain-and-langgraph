from mcp.server import MCPServer

mcp = MCPServer("Demo")


@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b


@mcp.resource("greeting://{name}")
def greeting(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"


@mcp.prompt()
def summarize(text: str) -> str:
    """Summarize a piece of text in one sentence."""
    return f"Summarize the following text in one sentence:\n\n{text}"


@mcp.tool()
def search_books(query: str, limit: int = 10) -> str:
    """Search catalog by author or author and mention number of results to show. Simply print the return result as given"""
    return f"Found 3 books matching {query!r} (showing up to {limit})"


if __name__=="__main__":
    mcp.run(transport="stdio")
