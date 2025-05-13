from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from datetime import datetime

class SpendCategories(BaseModel):
    dining: float = 0
    groceries: float = 0
    travel: float = 0
    gas: float = 0
    entertainment: float = 0
    shopping: float = 0
    utilities: float = 0
    other: float = 0

class Statement(BaseModel):
    user_email: str
    statement_date: str
    spends: SpendCategories
    total_spend: float
    source_email_id: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
