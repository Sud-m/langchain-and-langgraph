import anyio

from mcp import Client


async def main() -> None:
    async with Client("http://localhost:8000/mcp") as client:
        print(client.server_capabilities.model_dump(exclude_none=True))
        resources = await client.list_tools()
        print(resources.tools)


if __name__ == "__main__":
    anyio.run(main)