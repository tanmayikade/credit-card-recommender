import os
from pymongo import MongoClient
from typing import Dict, Any

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")

_db = None

def get_database():
    """Get MongoDB database connection"""
    global _db
    if _db is None:
        client = MongoClient(MONGO_URI)
        _db = client.maxx_mai_card
    return _db
