from dotenv import load_dotenv
from langchain_unstructured import UnstructuredLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from openai import OpenAI
from pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings
import os

load_dotenv()

urls = [
    "https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/",
    "https://lilianweng.github.io/posts/2023-06-23-agent/",
    "https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/",
]

docs = [
    UnstructuredLoader(
        web_url=url, chunking_strategy="basic", max_characters=1000000
    ).load()
    for url in urls
]  # Simply loads and returns websites as documents

# docs = [
#     [Document(...), Document(...)],  # URL 1
#     [Document(...)],                 # URL 2
#     [Document(...), Document(...)],  # URL 3
# ]

# Each Document contains:

# Document(
#     page_content="Extracted article text...",
#     metadata={"source": "...", ...}
# )

doc_list = [
    item for sublist in docs for item in sublist
]  # flatten the list of lists into a single list

text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=250, chunk_overlap=0
)

doc_splits = text_splitter.split_documents(doc_list)

# PineconeVectorStore.from_documents(
#     documents=doc_splits,
#     embedding=OpenAIEmbeddings(),
#     index_name=os.environ["INDEX_NAME"],
# )

retriever = PineconeVectorStore(
    index_name=os.environ["INDEX_NAME"], embedding=OpenAIEmbeddings()
).as_retriever(search_kwargs={"k": 3})

