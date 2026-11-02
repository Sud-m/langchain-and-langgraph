import time
from dotenv import load_dotenv

load_dotenv()
from langchain_typesafe import Noul, TypeSafeClassifier

classifier = TypeSafeClassifier(
    base_url="http://localhost:11434", model="tev1"
)

QUESTIONS = {  # Can contain questions of multiple types, hence Dict
    "urgent": Noul(instructions="Does this message need attention right now?")
}

STATE = "The deploy failed twice but customers are good and production isn't impacted, this can wait. Can someone look now?"

start = time.perf_counter()
res = classifier.invoke({"state": STATE, "questions": QUESTIONS})

elapsed = (time.perf_counter() - start) * 1000

urgency = res.nouls
print(f"Elapsed time: {elapsed} ms")
print(res)