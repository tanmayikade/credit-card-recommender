from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import RedirectResponse
import uvicorn
import ssl
from pydantic import BaseModel
from typing import Dict, Any, List, Optional

from app.auth.jwt import create_access_token, get_current_user
from app.auth.oauth import get_authorization_url, process_oauth_callback
from app.models.user import User
from app.models.statement import Statement, SpendCategories
from app.services.gmail import fetch_latest_statement
from app.services.recommendation import recommend_card
from app.utils.db import get_database

app = FastAPI(title="Maxx Mai Card API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Auth routes
@app.get("/auth/url")
async def auth_url():
    """Generate Gmail OAuth URL"""
    url = get_authorization_url()
    return {"url": url}

@app.get("/auth/callback")
async def auth_callback(code: str):
    """Process OAuth callback and create user"""
    db = get_database()
    user_data = await process_oauth_callback(code)
    
    # Check if user exists, otherwise create
    user_collection = db.users
    existing_user = user_collection.find_one({"email": user_data["email"]})
    
    if not existing_user:
        user = User(**user_data)
        user_collection.insert_one(user.dict())
    else:
        # Update tokens
        user_collection.update_one(
            {"email": user_data["email"]},
            {"$set": {
                "access_token": user_data["access_token"],
                "refresh_token": user_data["refresh_token"],
                "token_expiry": user_data["token_expiry"]
            }}
        )
    
    # Create JWT token
    access_token = create_access_token(data={"sub": user_data["email"]})
    # Redirect to frontend with token
    redirect_url = f"http://localhost:3000/callback?token={access_token}"
    return RedirectResponse(url=redirect_url)

# Statement routes
@app.get("/statements/fetch", response_model=Statement)
async def fetch_statement(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Fetch latest e-statement from Gmail"""
    user = await get_current_user(credentials.credentials)
    db = get_database()
    
    # Fetch latest statement
    statement_data = await fetch_latest_statement(user)
    
    # Save to database
    statement = Statement(**statement_data)
    db.statements.insert_one(statement.dict())
    
    return statement

# Recommendation routes
class RecommendationRequest(BaseModel):
    spends: SpendCategories

@app.post("/recommend")
async def get_recommendation(
    request: RecommendationRequest,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
):
    """Get card recommendation based on spending patterns"""
    user = None
    if credentials:
        try:
            user = await get_current_user(credentials.credentials)
        except:
            # Continue without user authentication
            pass
    
    # Get recommendation
    recommendation = recommend_card(request.spends)
    return recommendation

if __name__ == "__main__":
    # SSL context for HTTPS
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain("../certs/server.crt", keyfile="../certs/server.key")
    
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        ssl=ssl_context
    )
