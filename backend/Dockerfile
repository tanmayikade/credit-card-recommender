FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for TLS/SSL
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc libssl-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "-m", "app.main"]
