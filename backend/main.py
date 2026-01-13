from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import docx
from transformers import AutoTokenizer, AutoModel
import torch

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load AI model once (MiniLM-L6)
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def embed_text(text):
    tokens = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        output = model(**tokens)
    embedding = output.last_hidden_state.mean(dim=1).squeeze()
    return embedding

def extract_text_from_pdf(file):
    with pdfplumber.open(file) as pdf:
        return "\n".join(page.extract_text() or "" for page in pdf.pages)

def extract_text_from_docx(file):
    doc = docx.Document(file)
    return "\n".join(p.text for p in doc.paragraphs)


@app.post("/analyze")
async def analyze_resume(resume: UploadFile = File(...), job_description: str = Form(...)):
    # Extract resume text
    if resume.filename.endswith(".pdf"):
        resume_text = extract_text_from_pdf(resume.file)
    elif resume.filename.endswith(".docx"):
        resume_text = extract_text_from_docx(resume.file)
    else:
        return {"error": "Unsupported file type. Upload PDF or DOCX."}

    # Generate embeddings
    resume_vec = embed_text(resume_text)
    jd_vec = embed_text(job_description)

    # Compute similarity (cosine)
    similarity = torch.nn.functional.cosine_similarity(resume_vec, jd_vec, dim=0).item()
    score = round(similarity * 100, 2)

    return {
        "match_score": score,
        "message": "Resume analyzed successfully!",
    }
