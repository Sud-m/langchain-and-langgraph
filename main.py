import anyio

from langchain.mcp import MCPAdapter
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from dotenv import load_dotenv

load_dotenv()


async def main() -> None:
    async with MCPAdapter("http://localhost:8000/mcp") as adapter:
        tools = await adapter.list_tools()
        agent = create_agent(model=ChatOpenAI(model="gpt-4o-mini"), tools=tools)
        res = await agent.ainvoke(
            {
                "messages": [
                    HumanMessage(
                        "What is the sum of 27 and 39?"
                        " What books are available for Ruskin Bond?"
                    )
                ]
            }
        )
        print(res["messages"][-1].content)


if __name__ == "__main__":
    anyio.run(main)
