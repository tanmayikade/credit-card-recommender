# CardGenius - Backend

This is the backend service for the CardGenius recommendation system. It provides APIs for Gmail authentication, e-statement fetching, and credit card recommendations.

## Features

- **Gmail OAuth Integration**: Secure authentication with Gmail
- **E-statement Analysis**: Extract spending data from Gmail e-statements
- **Credit Card Recommendation Engine**: Algorithm to match spending patterns with optimal credit cards
- **RESTful API**: Well-documented endpoints for frontend integration
- **MongoDB Integration**: Efficient data storage and retrieval
- **HTTPS Support**: Secure communication with SSL/TLS
- **Docker Support**: Easy deployment with containerization

## Setup Options

### Prerequisites

- Python 3.9+
- MongoDB (running locally or accessible)
- Google API credentials (see main README for setup instructions)

### Environment Configuration

Create a `.env` file based on `.env.example` and fill in the required values:

```
# MongoDB
MONGO_URI=mongodb://localhost:27017/

# JWT
JWT_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OAUTH_REDIRECT_URI=https://localhost:3000/auth/callback
```

### Manual Setup

1. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Generate self-signed certificates for HTTPS (if not already done at the project root):

```bash
mkdir -p ../certs
openssl req -x509 -newkey rsa:4096 -keyout ../certs/server.key -out ../certs/server.crt -days 365 -nodes -subj "/CN=localhost"
```

4. Run the application:

```bash
python -m app.main
```

The backend will be available at [https://localhost:8000](https://localhost:8000).

### Docker Setup

You can run the backend using Docker:

```bash
# Build the image
docker build -t cardgenius-backend .

# Run the container
docker run -p 8000:8000 -v $(pwd)/../certs:/app/certs --env-file .env cardgenius-backend
```

Alternatively, use Docker Compose from the project root (recommended):

```bash
cd ..
docker-compose up -d
```

## API Endpoints

### Authentication

- `GET /auth/url` - Get Gmail OAuth URL
- `GET /auth/callback` - Process OAuth callback

### E-statements

- `GET /statements/fetch` - Fetch latest e-statement from Gmail

### Recommendations

- `POST /recommend` - Get card recommendation based on spending patterns

## Example API Calls

### Get OAuth URL

```bash
curl -k https://localhost:8000/auth/url
```

### Get Card Recommendation

```bash
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
```

## Troubleshooting

- **MongoDB Connection Issues**: Ensure MongoDB is running and accessible at the URI specified in your `.env` file
- **SSL Certificate Errors**: Verify that the certificates are correctly generated and accessible
- **Google API Errors**: Check your Google API credentials and ensure the correct redirect URIs are configured

## Development

The backend is built with FastAPI, which provides automatic API documentation. You can access the interactive API docs at:

- Swagger UI: [https://localhost:8000/docs](https://localhost:8000/docs)
- ReDoc: [https://localhost:8000/redoc](https://localhost:8000/redoc)
