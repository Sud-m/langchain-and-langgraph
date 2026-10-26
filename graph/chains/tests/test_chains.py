# def test_foo() -> None:
#     assert 1 == 1

from pprint import pprint
from dotenv import load_dotenv

load_dotenv()

from graph.chains.retrieval_grader import GradeDocuments, retrieval_grader
from ingestion import retriever


def test_retrieval_grader_answer_yes() -> None:
    question = "agent memory"
    docs = retriever.invoke(question)
    doc_txt = docs[0].page_content

    res: GradeDocuments = retrieval_grader.invoke(
        {"question": question, "document": doc_txt}
    )
    assert res.binary_score == "yes"


def test_retrieval_grader_answer_no() -> None:
    question = "agent memory"
    docs = retriever.invoke(question)
    doc_txt = docs[0].page_content

    res: GradeDocuments = retrieval_grader.invoke(
        {
            "question": "How to make pizza",
            "document": doc_txt,
        }  # BS question to check whether grader can tell if docs are meaningless compared to question
    )
    assert res.binary_score == "no"


from graph.chains.generation import generation_chain


def test_generation_chain() -> None:
    """"""
    question = "agent memory"
    docs = retriever.invoke(question)
    generation = generation_chain.invoke({"context": docs, "question": question})
    print(generation)
