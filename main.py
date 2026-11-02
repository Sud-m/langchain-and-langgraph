from pprint import pprint
import time
from dotenv import load_dotenv

load_dotenv()
from langchain_typesafe import Noul, NoulCriteria, TypeSafeClassifier, Choice, Score

classifier = TypeSafeClassifier()

QUESTIONS = {  # Can contain questions of multiple types, hence Dict
    "urgent": Noul(
        instructions="Does this message need attention right now?",
        criteria=NoulCriteria(
            true="The customer is blocked or losing money right now",
            false="The issue is annoying but the customer can keep working",
        ),
    ),
    "department": Choice(
        instructions="Which team should handle this ticket?",
        criteria={
            "billing": "Payments, invoices, refunds, or subscription changes",
            "technical": "bugs, errors, outages, or integration",
            "sales": "Pricing, plans, or purchase questions",
            "other": "None of the above",
        },
    ),
    "frustration": Score(
        instructions="How frustrated does the customer appear?",
        criteria=[
            "Calm and neutral",  # Contradicts instruction
            "Concerned but civil",  # Slightly supports instruction
            "Angry and using provocative language",  # Fully supports instruction
        ],
    ),
}

STATE = (
    "Stripe has failed to connect for three days and I can't accept any payments."
    "I've emailed twice about this with no answer, please fix now or I'm cancelling"
)

start = time.perf_counter()
res = classifier.invoke({"state": STATE, "questions": QUESTIONS})

elapsed = (time.perf_counter() - start) * 1000

print(f"Elapsed time: {elapsed} ms")
pprint(res)
