# Deployment Guide

## Important: Node.js Version Requirement

This project requires **Node.js 20.9.0 or higher**. Your current system has Node v16.13.2.

### Option 1: Deploy to Vercel (Recommended)

Vercel handles the Node.js version automatically. Just push to GitHub and connect:

1. **Push to GitHub:**
   ```bash
   cd nethermind-director
   git init
   git add .
   git commit -m "Initial commit: Nethermind Director"
   gh repo create nethermind-director --public --source=. --remote=origin --push
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Vercel will build with the correct Node version

### Option 2: Upgrade Node.js Locally

Using [nvm](https://github.com/nvm-sh/nvm):

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 20
nvm install 20
nvm use 20

# Now build
cd nethermind-director
npm install
npm run build
npm run dev
```

### Option 3: Use Vercel CLI

```bash
npm i -g vercel
cd nethermind-director
vercel
```

Vercel CLI will deploy with the correct Node version in the cloud.

## After Deployment

1. Get your Claude API key from [console.anthropic.com](https://console.anthropic.com)
2. Get your YouTube Data API key from [console.cloud.google.com](https://console.cloud.google.com)
3. Open your deployed app and paste in both keys
4. Click "GENERATE 3 VIDEO BRIEFS"
5. Get your content briefs with actual clip sources!

## Local Development (After Upgrading Node)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
