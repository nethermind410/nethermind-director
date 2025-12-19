# Nethermind Director - Project Structure

## Overview
Location: `/Users/courtneyblyde/Desktop/youtube/nethermind-director`

## File Structure

```
nethermind-director/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── generate/
│   │       └── route.ts         # Main API route for generating briefs
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main UI page
├── lib/                          # Utilities and helpers
│   ├── trends.ts                # API integrations (Reddit, MAL, TMDB, YouTube)
│   └── types.ts                 # TypeScript type definitions
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore file
├── DEPLOYMENT.md                 # Deployment instructions
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── README.md                     # Project documentation
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── vercel.json                   # Vercel deployment configuration
```

## Key Components

### Frontend (`app/page.tsx`)
- Single-page web app
- API key inputs for Claude and YouTube
- Beautiful gradient UI with "buff nerd" aesthetic
- Displays 3 video briefs with full details
- Shows clip sources with YouTube links

### Backend (`app/api/generate/route.ts`)
- Fetches trends from Reddit, MAL, TMDB, YouTube
- Calls Claude AI with trend context
- Claude makes 3 DECISIONS (not suggestions)
- Searches YouTube for actual clips
- Returns complete briefs with:
  - Topic, angle, hook, script
  - Edit structure, captions, hashtags
  - YouTube clip sources with links & timestamps
  - Reasoning for each decision

### Integrations (`lib/trends.ts`)
- **Reddit**: Monitors r/anime, r/gaming, r/Marvel, r/DC_Cinematic, etc.
- **MyAnimeList**: Via Jikan API for trending anime
- **TMDB**: Trending movies/shows
- **YouTube**: Trending videos + clip search
- All data fed to Claude for decision-making

## Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production (requires Node 20+)
npm start      # Start production server
```

## API Keys Needed

1. **Claude API**: Get from [console.anthropic.com](https://console.anthropic.com)
2. **YouTube Data API**: Get from [console.cloud.google.com](https://console.cloud.google.com)

Both are entered in the web UI (not environment variables).

## Deployment

See `DEPLOYMENT.md` for full instructions.

**Quick Deploy to Vercel:**
1. Push to GitHub
2. Connect repo on vercel.com
3. Deploy (Vercel handles Node version automatically)

## What Makes This Different

Unlike "Scrappy" or other trend tools:
- **Makes decisions**, doesn't just list options
- **Sources actual clips** with YouTube links and timestamps
- **Connects dots** across niches for unique angles
- **Generates everything** you need to execute immediately
- **No browsing** required - just hit the button and execute

## Content Focus

- **Niche**: Comics, anime, gaming, movies, nerd culture
- **Tone**: Dark humor, "buff nerd" energy, ironic detachment + genuine passion
- **Format**: 30-45 second vertical videos
- **Frequency**: 3-4x per week
- **Style**: Text/captions first, voiceover later
