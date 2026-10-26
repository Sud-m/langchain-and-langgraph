from dotenv import load_dotenv

load_dotenv()

from langgraph.graph import StateGraph, END
from graph.consts import RETRIEVE, WEBSEARCH, GENERATE, GRADE_DOCUMENTS
from graph.nodes import generate, web_search, grade_documents, retrieve
from graph.state import GraphState


def decide_to_generate(state):
    print("Assess graded documents")

    if state["web_search"]:
        print(" Decision: Not all documents are relevant to the question")
        return WEBSEARCH
    else:
        print(" Decision: Generate")
        return GENERATE


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

flow.add_edge(WEBSEARCH, GENERATE)
flow.add_edge(GENERATE, END)
app = flow.compile()
app.get_graph().draw_mermaid_png(output_file_path="graph.png")
