export interface ClipSource {
  videoTitle: string
  channelName: string
  videoUrl: string
  timestamp: string
  searchTerms: string[]
  reasoning: string
}

export interface VideoIdea {
  topic: string
  angle: string
  hook: string
  script: string
  editStructure: string[]
  captions: string[]
  hashtags: string[]
  clipSources: ClipSource[]
  reasoning: string
}

export interface RedditPost {
  title: string
  subreddit: string
  score: number
  url: string
  created: number
}

export interface MALAnime {
  title: string
  score: number
  rank: number
  popularity: number
}

export interface TMDBMovie {
  title: string
  vote_average: number
  popularity: number
  release_date: string
}

export interface YouTubeTrend {
  title: string
  channelTitle: string
  viewCount: string
  publishedAt: string
  videoId: string
}
