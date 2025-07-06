#!/bin/bash

# NBA Stats App Setup Script
echo "🏀 Setting up NBA Stats Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Containers are running successfully!"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Open VS Code in this directory"
    echo "2. Install 'Dev Containers' extension if not already installed"
    echo "3. Click the green button in bottom-left corner (><)"
    echo "4. Select 'Reopen in Container'"
    echo "5. Visit http://localhost:3000 to see your NBA Stats app!"
    echo ""
    echo "🔍 Useful commands:"
    echo "  docker-compose logs -f    # View container logs"
    echo "  docker-compose down       # Stop containers"
    echo "  docker-compose up -d      # Start containers"
    echo ""
else
    echo "❌ Something went wrong. Check the logs:"
    docker-compose logs
    exit 1
fi