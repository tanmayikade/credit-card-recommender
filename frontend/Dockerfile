FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create certs directory
RUN mkdir -p /app/certs

# Expose port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
