FROM python:3.9-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Create certs directory
RUN mkdir -p /app/certs

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "-m", "app.main"]
