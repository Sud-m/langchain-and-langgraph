from typing import Literal
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI


class RouteQuery(BaseModel):
    """Route a user to the most relevant datasource"""

    datasource: Literal["vectorstore", "websearch"] = Field(
        ...,  # This means datasource is required on RouteQuery initialization
        description="Given a user question, choose to route it to websearch or vectorstore",
    )


llm = ChatOpenAI(model="gpt-4o-mini")
llm_structured = llm.with_structured_output(RouteQuery)

system = """You are an expert at routing a user question to a vector store or web search.
The vector store contains documents related to agents, prompt engineering, and adversarial attacks.
Use 'vectorstore' for questions on these topics, use 'websearch' for anything else."""

route_prompt = ChatPromptTemplate.from_messages(
    [("system", system), ("human", "{question}")]
)

question_router_chain = route_prompt | llm_structured
