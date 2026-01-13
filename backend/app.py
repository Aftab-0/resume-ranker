from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer

app = FastAPI()

# Allow frontend (Vite) to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = SentenceTransformer("all-MiniLM-L6-v2")


@app.get("/")
def home():
    return {"message": "Backend is running successfully!"}


@app.get("/test-nlp")
def test_nlp():
    text = "Hello, this is a test sentence."
    embedding = model.encode(text)
    return {"embedding_length": len(embedding)}
