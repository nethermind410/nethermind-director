# Nethermind Director

AI-powered content director for your YouTube/TikTok channel. It doesn't give options — it makes decisions and hands you everything you need to execute.

## Features

- **Trend Monitoring**: Automatically monitors Reddit, MyAnimeList, TMDB, and YouTube for trending content
- **AI Decision Making**: Uses Claude AI to pick 3 video ideas per session with reasoning
- **Full Briefs**: Generates complete video briefs including:
  - Topic and unique angle
  - Hook to stop the scroll
  - Full script (30-45 seconds)
  - Edit structure and pacing guide
  - Captions and hashtags
  - **Actual clip sources** with YouTube links and search terms
- **Niche Connection**: Connects dots across niches to find angles nobody else is doing

## Setup

### Prerequisites

1. **Claude API Key**: Get from [Anthropic Console](https://console.anthropic.com/)
2. **YouTube Data API Key**: Get from [Google Cloud Console](https://console.cloud.google.com/)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

1. Push this repository to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Usage

1. Enter your Claude API key and YouTube Data API key
2. Click "GENERATE 3 VIDEO BRIEFS"
3. Wait for the AI to analyze trends and make decisions
4. Get your complete video briefs with clip sources
5. Execute!

## Content Focus

Niche: Comic, anime, gaming, movies, nerd culture, dark humor, "buff nerd" energy.
Format: 30-45 second vertical videos, 3-4x per week.
Style: Text/captions to start, voiceover later. Think ironic detachment + genuine passion.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Claude AI (Anthropic)
- YouTube Data API v3
- Reddit API
- Jikan API (MyAnimeList)
- TMDB API

## License

ISC
