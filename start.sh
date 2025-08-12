#!/bin/bash

# GitRank Live Deployment Script
set -e

echo "🚀 Starting GitRank Live deployment..."

# Environment check
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  Warning: GITHUB_TOKEN not set. API rate limits will be lower."
else
    echo "✅ GitHub token configured"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run tests (if not in production)
if [ "$NODE_ENV" != "production" ]; then
    echo "🧪 Running tests..."
    npm test
fi

# Start the application
echo "🚀 Starting GitRank Live server..."
exec node src/server.js
