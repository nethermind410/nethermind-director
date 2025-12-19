#!/bin/bash

echo "🎬 Nethermind Director - Quick Deploy to Vercel"
echo "================================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI not found. Installing via Homebrew..."
    brew install gh
fi

# Check if user is logged in to gh
if ! gh auth status &> /dev/null; then
    echo "🔐 Please login to GitHub CLI..."
    gh auth login
fi

echo "📦 Creating GitHub repository..."
git init
git add .
git commit -m "🚀 Initial commit: Nethermind Director

A web app that acts as a content director for YouTube/TikTok.
- Monitors trends across Reddit, MyAnimeList, TMDB, YouTube
- Makes 3 video decisions per session (not options)
- Generates full briefs with scripts, captions, hashtags
- Sources actual clips with YouTube links and timestamps
- Connects dots across niches for unique angles"

# Create GitHub repo
gh repo create nethermind-director --public --source=. --remote=origin --push

echo ""
echo "✅ Repository created and pushed!"
echo ""
echo "🚀 Now deploying to Vercel..."
echo "   Go to: https://vercel.com/new"
echo "   1. Import your 'nethermind-director' repository"
echo "   2. Click Deploy"
echo "   3. Done!"
echo ""
echo "📝 Don't forget:"
echo "   - Get Claude API key: https://console.anthropic.com"
echo "   - Get YouTube API key: https://console.cloud.google.com"
echo ""
echo "🎉 Your app will be live in ~2 minutes!"
