from app.ai.embeddings import get_embedding
from app.services.gemini_service import generate_response

# Temporary in-memory store (later → DB / vector DB)
DOCUMENTS = []

def add_document(text: str):
    embedding = get_embedding(text)

    DOCUMENTS.append({
        "text": text,
        "embedding": embedding
    })


def cosine_similarity(vec1, vec2):
    import numpy as np
    vec1, vec2 = np.array(vec1), np.array(vec2)
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))


def retrieve(query: str, top_k=3):
    query_embedding = get_embedding(query)

    scored_docs = []

    for doc in DOCUMENTS:
        score = cosine_similarity(query_embedding, doc["embedding"])
        scored_docs.append((score, doc["text"]))

    scored_docs.sort(reverse=True)

    return [doc[1] for doc in scored_docs[:top_k]]


def rag_answer(query: str):
    context_docs = retrieve(query)

    context = "\n".join(context_docs)

    prompt = f"""
    Answer the question using the context below.

    Context:
    {context}

    Question:
    {query}
    """

    return generate_response(prompt)
