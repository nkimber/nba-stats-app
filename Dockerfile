# Use Node.js 18 LTS with Debian (better Prisma compatibility)
FROM node:18

# Install system dependencies
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client for the correct platform
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "dev"]