from bson import ObjectId

# Convert MongoDB object to JSON
def serialize_doc(doc):
    if not doc:
        return None

    doc["_id"] = str(doc["_id"])
    return doc


# Convert list of docs
def serialize_list(docs):
    return [serialize_doc(doc) for doc in docs]


# Convert string → ObjectId safely
def to_object_id(id: str):
    try:
        return ObjectId(id)
    except:
        return None
