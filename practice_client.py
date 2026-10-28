from email import message
from pathlib import Path
from pprint import pprint
import anyio
from langchain.mcp import MCPAdapter
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()


async def main():
    # server_path = Path(__file__).resolve().parent / "servers" / "practice_server.py"
    async with MCPAdapter(
        Path("servers/practice_server.py")
    ) as adapter:  # Automatically starts practice_server.py
        tools = await adapter.list_tools()

        # print("Available tools:")
        # for tool in tools:
        #     print(tool.name, tool.args_schema)

        # tools_names = {tool.name: tool for tool in tools}

        agent = create_agent(model=ChatOpenAI(model="gpt-4o-mini"), tools=tools)
        result = await agent.ainvoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": "Add 12 and 14, then add 100 to that result",
                    }
                ]
            }
        )
        for message in result["messages"]:
            pprint(message)


if __name__ == "__main__":
    anyio.run(main)
