# Maxx Mai Card - Frontend

This is the frontend application for the Maxx Mai Card recommendation system. It provides a user interface for Gmail authentication, spending input, and credit card recommendations.

## Setup

1. Create a `.env.local` file based on `.env.local.example` and fill in the required values:

\`\`\`
NEXT_PUBLIC_API_URL=https://localhost:8000
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Make sure the certificates from the backend are available:

\`\`\`bash
# Ensure the certs directory exists at the project root
mkdir -p ../certs
# If you haven't generated certificates yet, do so:
openssl req -x509 -newkey rsa:4096 -keyout ../certs/server.key -out ../certs/server.crt -days 365 -nodes -subj "/CN=localhost"
\`\`\`

4. Run the development server:

\`\`\`bash
npm run dev
\`\`\`

5. Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

## Features

- Gmail OAuth authentication
- Manual spending input form
- E-statement fetching from Gmail
- Credit card recommendation based on spending patterns
\`\`\`

## Docker and Root Files
