import sys
from pathlib import Path
import anyio
from mcp import Client, StdioServerParameters

async def main():
    path = (Path(__file__).resolve().parent / "servers" / "practice_server.py")

    server = StdioServerParameters(command=sys.executable, args=[str(path)])

    async with Client(server) as client:
        listening = await client.list_tools()
        for tool in listening.tools:
            print(tool.model_dump_json(indent=2))

        res = await client.call_tool("add", {"a": 12, "b": 14})
        print(res.model_dump_json(indent=2))

if __name__=="__main__":
    anyio.run(main)
