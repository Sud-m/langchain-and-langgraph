# Chain that determines whether llm answer is grounded in documents

from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from langchain_core.runnables import Runnable, RunnableSequence
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")


class GradeHallucinations(BaseModel):
    """Binary score for hallucination present in the generation answer."""

    binary_score: str = Field(
        description="Answer is grounded in the facts, 'yes' or 'no'"
    )


structured_llm_grader = llm.with_structured_output(
    GradeHallucinations
)  # Structures output

system = """You are a grader assessing whether an LLM generation is grounded in / supported by a set of retrieved facts.
Give a binary score 'yes' or 'no'. 'yes' means the answer is grounded in or supported by the set of facts, 'no' otherwise."""

hallucination_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("human", "Set of facts: \n{documents}\nLLM Generation: {generation}"),
    ]
)

hallucination_grader: RunnableSequence = hallucination_prompt | structured_llm_grader