# Maxx Mai Card

A credit card recommendation system that analyzes your spending patterns and recommends the best credit card for you.

## Project Structure

This is a monorepo containing both the backend and frontend applications:

- `/backend` - FastAPI application with MongoDB
- `/frontend` - Next.js application
- `/certs` - SSL certificates for HTTPS

## Setup

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- MongoDB (or use Docker)
- Google API credentials (for Gmail OAuth)

### Generate SSL Certificates

Generate self-signed certificates for HTTPS:

\`\`\`bash
mkdir -p certs
openssl req -x509 -newkey rsa:4096 -keyout certs/server.key -out certs/server.crt -days 365 -nodes -subj "/CN=localhost"
\`\`\`

### Backend Setup

1. Navigate to the backend directory:

\`\`\`bash
cd backend
\`\`\`

2. Create a virtual environment and activate it:

\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

3. Install dependencies:

\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Create a `.env` file based on `.env.example` and fill in the required values.

5. Run the backend:

\`\`\`bash
python -m app.main
\`\`\`

### Frontend Setup

0. Open a new terminal window to set up the frontend.

1. Navigate to the frontend directory:

\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file based on `.env.local.example` and fill in the required values.

4. Run the frontend:

\`\`\`bash
npm run dev
\`\`\`

### Using Docker

You can also run the entire application using Docker Compose:

\`\`\`bash
docker-compose up -d
\`\`\`

## Usage

1. Open [https://localhost:3000](https://localhost:3000) in your browser.
2. Click "Connect Gmail" to authenticate with your Gmail account.
3. After authentication, you can either fetch your latest e-statement or manually enter your spending.
4. Get personalized credit card recommendations based on your spending patterns.

## Features

- Gmail OAuth authentication
- E-statement analysis from Gmail
- Manual spending input
- Credit card recommendation engine
- Responsive UI
