# CardGenius

Credit Card Recommendation System

Deployed here: [CardGenius Vercel App](https://v0-maxx-maik.vercel.app/)
- Note: Backend spins down with inactivity, which can delay requests by 50 seconds or more

## Project Overview

CardGenius is a full-stack application that helps users find the best credit card for their spending patterns. The system can analyze Gmail e-statements or accept manual spending input to provide personalized credit card recommendations.

## Project Structure

This is a monorepo containing both the backend and frontend applications:

- `/backend` - FastAPI application with MongoDB for data storage
- `/frontend` - Next.js application with responsive UI
- `/certs` - SSL certificates for HTTPS connections

## Features

- **Gmail OAuth Authentication**: Secure authentication with Gmail
- **E-statement Analysis**: Automatically extract spending data from Gmail e-statements
- **Manual Spending Input**: Alternative option to enter spending data manually
- **Credit Card Recommendation Engine**: Sophisticated algorithm to match spending patterns with optimal credit cards
- **Responsive UI**: Mobile-friendly interface that works across devices
- **Secure HTTPS Communication**: End-to-end encryption for all data transfers
- **Docker Support**: Easy deployment with Docker Compose

## Setup Options

You can set up the application in two ways:

1. **Manual Setup**: Set up each component individually
2. **Docker Setup**: Quick setup using Docker Compose (recommended)

## Docker Setup (Recommended)

### Prerequisites

- Docker and Docker Compose installed
- Google API credentials (see [Google API Setup](#google-api-setup) section)

### Steps

1. Clone the repository:

[https://github.com/tanmayikade/credit-card-recommender.git](https://github.com/tanmayikade/credit-card-recommender.git)

```bash
git clone https://github.com/tanmayikade/credit-card-recommender.git
```

2. Generate SSL certificates for HTTPS:

```bash
mkdir -p certs
openssl req -x509 -newkey rsa:4096 -keyout certs/server.key -out certs/server.crt -days 365 -nodes -subj "/CN=localhost"
```

3. Create configuration files:

   - Create `backend/.env` file based on `backend/.env.example`
   - Create `frontend/.env.local` file based on `frontend/.env.local.example`

4. Start the application:

```bash
docker-compose up -d
```

5. Access the application at [https://localhost:3000](https://localhost:3000)

## Manual Setup

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- MongoDB (running locally or accessible)
- Google API credentials (see [Google API Setup](#google-api-setup) section)

### Generate SSL Certificates

```bash
mkdir -p certs
openssl req -x509 -newkey rsa:4096 -keyout certs/server.key -out certs/server.crt -days 365 -nodes -subj "/CN=localhost"
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file based on `.env.example` and fill in the required values.

5. Run the backend:

```bash
python -m app.main
```

The backend will be available at [https://localhost:8000](https://localhost:8000).

### Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on `.env.local.example` and fill in the required values.

4. Run the frontend:

```bash
npm run dev
```

The frontend will be available at [https://localhost:3000](https://localhost:3000).

## Google API Setup

To enable Gmail OAuth and e-statement fetching, you need to set up Google API credentials:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to "APIs & Services" > "Library"
4. Enable the following APIs:
   - Gmail API
   - Google OAuth2 API
5. Go to "APIs & Services" > "Credentials"
6. Create an OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: Maxx Mai Card (or your preferred name)
   - Authorized JavaScript origins: https://localhost:3000
   - Authorized redirect URIs: https://localhost:3000/auth/callback
7. Download the credentials and use them in your configuration files

## Usage

1. Open [https://localhost:3000](https://localhost:3000) in your browser
2. Click "Connect Gmail" to authenticate with your Gmail account
3. After authentication, you can either:
   - Fetch your latest e-statement from Gmail, or
   - Manually enter your spending data
4. Get personalized credit card recommendations based on your spending patterns

## Troubleshooting

- **Certificate Issues**: If you encounter certificate warnings in your browser, you can either add an exception or generate proper certificates.
- **Allowing Self-Signed Certificates**:  
  Most browsers block self-signed certificates by default. To allow access, follow the steps for your operating system:

  **macOS:**
  1. Open **Keychain Access** (search for it in Spotlight).
  2. Go to **File > Import Items...** and select your `server.crt` file from the `certs` directory.
  3. Find the imported certificate in the **login** keychain, double-click it, expand **Trust**, and set **When using this certificate** to **Always Trust**.
  4. Close the window and enter your password if prompted.
  5. Restart your browser.

  **Windows:**
  1. Double-click the `server.crt` file.
  2. Click **Install Certificate...**.
  3. Choose **Local Machine** and click **Next**.
  4. Select **Place all certificates in the following store** and choose **Trusted Root Certification Authorities**.
  5. Complete the wizard and restart your browser.

  **Linux (Ubuntu example):**
  1. Copy `server.crt` to `/usr/local/share/ca-certificates/`:
     ```bash
     sudo cp certs/server.crt /usr/local/share/ca-certificates/server.crt
     sudo update-ca-certificates
     ```
  2. Restart your browser.

- **MongoDB Connection**: Ensure MongoDB is running if you're using the manual setup.
- **Google API Errors**: Verify your Google API credentials and ensure the correct redirect URIs are configured.

## License

[MIT](LICENSE)
