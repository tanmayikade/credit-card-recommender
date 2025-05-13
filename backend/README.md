# Maxx Mai Card - Backend

This is the backend service for the Maxx Mai Card recommendation system. It provides APIs for Gmail authentication, e-statement fetching, and credit card recommendations.

## Setup

1. Create a `.env` file based on `.env.example` and fill in the required values:

\`\`\`
# MongoDB
MONGO_URI=mongodb://localhost:27017/

# JWT
JWT_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OAUTH_REDIRECT_URI=https://localhost:3000/auth/callback
\`\`\`

2. Install dependencies:

\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Generate self-signed certificates for HTTPS:

\`\`\`bash
mkdir -p ../certs
openssl req -x509 -newkey rsa:4096 -keyout ../certs/server.key -out ../certs/server.crt -days 365 -nodes -subj "/CN=localhost"
\`\`\`

4. Run the application:

\`\`\`bash
python -m app.main
\`\`\`

## API Endpoints

- `GET /auth/url` - Get Gmail OAuth URL
- `GET /auth/callback` - Process OAuth callback
- `GET /statements/fetch` - Fetch latest e-statement from Gmail
- `POST /recommend` - Get card recommendation based on spending patterns

## Example API Calls

### Get OAuth URL

\`\`\`bash
curl -k https://localhost:8000/auth/url
\`\`\`

### Get Card Recommendation

\`\`\`bash
curl -k -X POST https://localhost:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "spends": {
      "dining": 500,
      "groceries": 300,
      "travel": 200,
      "gas": 150,
      "entertainment": 100,
      "shopping": 250,
      "utilities": 200,
      "other": 100
    }
  }'
\`\`\`

## Docker

You can also run the application using Docker:

\`\`\`bash
docker build -t maxx-mai-card-backend .
docker run -p 8000:8000 -v $(pwd)/../certs:/app/certs --env-file .env maxx-mai-card-backend
