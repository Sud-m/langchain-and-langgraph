from dotenv import load_dotenv

load_dotenv()

from langgraph.graph import StateGraph, END
from graph.consts import RETRIEVE, WEBSEARCH, GENERATE, GRADE_DOCUMENTS
from graph.nodes import generate, web_search, grade_documents, retrieve
from graph.state import GraphState
from graph.chains.hallucination_grader import hallucination_grader
from graph.chains.answer_grader import answer_grader


def decide_to_generate(state):
    print("Assess graded documents")

    if state["web_search"]:
        print(" Decision: Not all documents are relevant to the question")
        return WEBSEARCH
    else:
        print(" Decision: Generate")
        return GENERATE


def grade_generation_grounded_in_documents_and_question(state: GraphState) -> str:
    print("Check hallucinations")
    question = state["question"]
    documents = state["documents"]
    generation = state["generation"]
    score = hallucination_grader.invoke(
        {"documents": documents, "generation": generation}
    )
    if hallucination_grade := score.binary_score == "yes":  # no hallucination
        print(" GENERATION IS GROUNDED IN DOCUMENTS")
        print(" GRADING GENERATION VS QUESTION")
        answer_score = answer_grader.invoke(
            {"question": question, "generation": generation}
        )
        if answer_score.binary_score == "yes":
            print("     GENERATION INDEED ADDRESSES QUESTION")
            return "useful"
        else:  # does not answer question but is grounded
            print("     GENERATION DOESN'T ANSWER QUESTION")
            return "not useful"
    else:
        print(" GENERATION NOT GROUNDED IN DOCUMENTS, WEBSEARCH NEEDED")
        return "not grounded"


flow = StateGraph(GraphState)
flow.add_node(RETRIEVE, retrieve)
flow.add_node(GENERATE, generate)
flow.add_node(WEBSEARCH, web_search)
flow.add_node(GRADE_DOCUMENTS, grade_documents)
flow.set_entry_point(RETRIEVE)
flow.add_edge(RETRIEVE, GRADE_DOCUMENTS)

flow.add_conditional_edges(
    GRADE_DOCUMENTS, decide_to_generate, {WEBSEARCH: WEBSEARCH, GENERATE: GENERATE}
)
flow.add_conditional_edges(
    GENERATE,
    grade_generation_grounded_in_documents_and_question,
    {"not grounded": GENERATE, "useful": END, "not useful": WEBSEARCH},
)
flow.add_edge(WEBSEARCH, GENERATE)
flow.add_edge(GENERATE, END)
app = flow.compile()
app.get_graph().draw_mermaid_png(output_file_path="graph.png")
