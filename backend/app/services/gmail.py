import base64
import re
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from datetime import datetime
import os
import io
import PyPDF2
from typing import Dict, Any

from app.models.statement import SpendCategories

async def fetch_latest_statement(user: Dict[str, Any]):
    """Fetch latest e-statement from Gmail"""
    # Create credentials from user tokens
    credentials = Credentials(
        token=user["access_token"],
        refresh_token=user["refresh_token"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    )
    
    # Build Gmail service
    gmail_service = build('gmail', 'v1', credentials=credentials)
    
    # Search for e-statement emails
    query = "subject:e-statement"
    results = gmail_service.users().messages().list(userId='me', q=query).execute()
    messages = results.get('messages', [])
    
    if not messages:
        # No e-statement found
        return {
            "user_email": user["email"],
            "statement_date": datetime.utcnow().isoformat(),
            "spends": SpendCategories(),
            "total_spend": 0,
            "source_email_id": None
        }
    
    # Get the latest e-statement
    latest_message = messages[0]
    message = gmail_service.users().messages().get(userId='me', id=latest_message['id']).execute()
    
    # Extract statement date from email
    headers = message['payload']['headers']
    date = next((h['value'] for h in headers if h['name'] == 'Date'), None)
    statement_date = datetime.strptime(date, "%a, %d %b %Y %H:%M:%S %z").isoformat() if date else datetime.utcnow().isoformat()
    
    # Extract PDF attachment if exists
    spends = SpendCategories()
    total_spend = 0
    
    if 'parts' in message['payload']:
        for part in message['payload']['parts']:
            if part['filename'].endswith('.pdf'):
                # Get attachment
                attachment = gmail_service.users().messages().attachments().get(
                    userId='me', messageId=latest_message['id'], id=part['body']['attachmentId']
                ).execute()
                
                # Decode attachment
                file_data = base64.urlsafe_b64decode(attachment['data'])
                
                # Parse PDF
                pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_data))
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text()
                
                # Extract spending categories
                spends, total_spend = parse_statement_text(text)
                break
    
    # If no PDF, try to extract from email body
    if total_spend == 0 and 'body' in message['payload'] and 'data' in message['payload']['body']:
        body_data = base64.urlsafe_b64decode(message['payload']['body']['data']).decode('utf-8')
        spends, total_spend = parse_statement_text(body_data)
    
    return {
        "user_email": user["email"],
        "statement_date": statement_date,
        "spends": spends,
        "total_spend": total_spend,
        "source_email_id": latest_message['id']
    }

def parse_statement_text(text: str):
    """Parse statement text to extract spending categories"""
    # This is a simplified parser - in a real app, you'd use more sophisticated parsing
    spends = SpendCategories()
    
    # Look for spending categories
    dining_match = re.search(r'Dining[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if dining_match:
        spends.dining = float(dining_match.group(1).replace(',', ''))
    
    groceries_match = re.search(r'Groceries[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if groceries_match:
        spends.groceries = float(groceries_match.group(1).replace(',', ''))
    
    travel_match = re.search(r'Travel[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if travel_match:
        spends.travel = float(travel_match.group(1).replace(',', ''))
    
    gas_match = re.search(r'Gas[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if gas_match:
        spends.gas = float(gas_match.group(1).replace(',', ''))
    
    entertainment_match = re.search(r'Entertainment[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if entertainment_match:
        spends.entertainment = float(entertainment_match.group(1).replace(',', ''))
    
    shopping_match = re.search(r'Shopping[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if shopping_match:
        spends.shopping = float(shopping_match.group(1).replace(',', ''))
    
    utilities_match = re.search(r'Utilities[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if utilities_match:
        spends.utilities = float(utilities_match.group(1).replace(',', ''))
    
    other_match = re.search(r'Other[:\s]+\$?([0-9,.]+)', text, re.IGNORECASE)
    if other_match:
        spends.other = float(other_match.group(1).replace(',', ''))
    
    # Calculate total spend
    total_spend = (
        spends.dining + 
        spends.groceries + 
        spends.travel + 
        spends.gas + 
        spends.entertainment + 
        spends.shopping + 
        spends.utilities + 
        spends.other
    )
    
    return spends, total_spend
