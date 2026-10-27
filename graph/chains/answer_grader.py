from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from langchain_core.runnables import Runnable, RunnableSequence
from langchain_openai import ChatOpenAI


class GradeAnswer(BaseModel):
    binary_score: str = Field(
        description="Answer addresses the question, 'yes' or 'no'"
    ) # should be using bool, whatever


llm = ChatOpenAI(model="gpt-4o-mini")
structured_llm_grader = llm.with_structured_output(GradeAnswer)

system = """You are a grader assessing whether an answer addresses / resolves a question. 
Give a binary score 'yes' or 'no' where 'yes' means the answer did satisfy the question, 'no' otherwise"""

answer_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("user", "User question: \n{question}\nLLM Generation: {generation}")
    ]
)

answer_grader: RunnableSequence = answer_prompt | structured_llm_grader