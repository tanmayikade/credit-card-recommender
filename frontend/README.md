# Maxx Mai Card - Frontend

This is the frontend application for the Maxx Mai Card recommendation system. It provides a user interface for Gmail authentication, spending input, and credit card recommendations.

## Features

- **Responsive UI**: Mobile-friendly interface that works across devices
- **Gmail OAuth Integration**: Secure authentication with Gmail
- **E-statement Visualization**: Display spending data from Gmail e-statements
- **Manual Spending Form**: User-friendly interface for manual data entry
- **Credit Card Recommendations**: Visual display of recommended cards based on spending
- **HTTPS Support**: Secure communication with SSL/TLS
- **Next.js Framework**: Fast, server-side rendered React application

## Setup Options

### Prerequisites

- Node.js (v16+)
- Backend service running (see backend README)
- Google API credentials (see main README for setup instructions)

### Environment Configuration

Create a `.env.local` file based on `.env.local.example` and fill in the required values:

```
NEXT_PUBLIC_API_URL=https://localhost:8000
```

### Manual Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure the SSL certificates are available (if not already generated at the project root):

```bash
# Ensure the certs directory exists at the project root
mkdir -p ../certs
# If you haven't generated certificates yet, do so:
openssl req -x509 -newkey rsa:4096 -keyout ../certs/server.key -out ../certs/server.crt -days 365 -nodes -subj "/CN=localhost"
```

3. Run the development server:

```bash
npm run dev
```

4. Open [https://localhost:3000](https://localhost:3000) with your browser to see the application.

### Docker Setup

You can run the frontend using Docker:

```bash
# Build the image
docker build -t maxx-mai-card-frontend .

# Run the container
docker run -p 3000:3000 -v $(pwd)/../certs:/certs --env-file .env.local maxx-mai-card-frontend
```

Alternatively, use Docker Compose from the project root (recommended):

```bash
cd ..
docker-compose up -d
```

## Usage

1. Open [https://localhost:3000](https://localhost:3000) in your browser
2. Click "Connect Gmail" to authenticate with your Gmail account
3. After authentication, you can either:
   - Fetch your latest e-statement from Gmail, or
   - Manually enter your spending data using the form
4. View personalized credit card recommendations based on your spending patterns

## Google OAuth Integration

The frontend integrates with Google OAuth for Gmail authentication. The OAuth flow works as follows:

1. User clicks "Connect Gmail" button
2. User is redirected to Google's authentication page
3. After successful authentication, Google redirects back to the application
4. The application exchanges the authorization code for access tokens
5. The access tokens are used to fetch e-statements from Gmail

Make sure your Google API credentials are correctly configured as described in the main README.

## Troubleshooting

- **API Connection Issues**: Ensure the backend is running and accessible at the URL specified in your `.env.local` file
- **SSL Certificate Errors**: Verify that the certificates are correctly generated and accessible
- **Google Authentication Errors**: Check your Google API credentials and ensure the correct redirect URIs are configured

## Development

The frontend is built with Next.js and React. You can customize the UI components in the `components` directory and the pages in the `pages` directory.
