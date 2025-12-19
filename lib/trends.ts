import { RedditPost, MALAnime, TMDBMovie, YouTubeTrend } from './types'

export async function fetchRedditTrends(): Promise<RedditPost[]> {
  const subreddits = ['anime', 'gaming', 'Marvel', 'DC_Cinematic', 'movies', 'comicbooks', 'OnePiece', 'CharacterRant']
  const posts: RedditPost[] = []

  for (const subreddit of subreddits) {
    try {
      const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`, {
        headers: {
          'User-Agent': 'NethermindDirector/1.0'
        }
      })

      if (response.ok) {
        const data = await response.json()
        const subredditPosts = data.data.children.map((child: any) => ({
          title: child.data.title,
          subreddit: child.data.subreddit,
          score: child.data.score,
          url: `https://reddit.com${child.data.permalink}`,
          created: child.data.created_utc
        }))
        posts.push(...subredditPosts)
      }
    } catch (error) {
      console.error(`Error fetching r/${subreddit}:`, error)
    }
  }

  return posts.sort((a, b) => b.score - a.score).slice(0, 20)
}

export async function fetchMALTrends(): Promise<MALAnime[]> {
  try {
    // Using Jikan API (unofficial MAL API)
    const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=15')

    if (!response.ok) return []

    const data = await response.json()
    return data.data.map((anime: any) => ({
      title: anime.title,
      score: anime.score,
      rank: anime.rank,
      popularity: anime.popularity
    }))
  } catch (error) {
    console.error('Error fetching MAL trends:', error)
    return []
  }
}

export async function fetchTMDBTrends(): Promise<TMDBMovie[]> {
  try {
    // Using TMDB API - requires API key but has a free tier
    // For now, using trending endpoint which doesn't require auth
    const response = await fetch('https://api.themoviedb.org/3/trending/all/week', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) return []

    const data = await response.json()
    return data.results.slice(0, 15).map((item: any) => ({
      title: item.title || item.name,
      vote_average: item.vote_average,
      popularity: item.popularity,
      release_date: item.release_date || item.first_air_date
    }))
  } catch (error) {
    console.error('Error fetching TMDB trends:', error)
    return []
  }
}

export async function fetchYouTubeTrends(apiKey: string): Promise<YouTubeTrend[]> {
  try {
    const categories = ['20', '24'] // Gaming and Entertainment
    const trends: YouTubeTrend[] = []

    for (const category of categories) {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=25&key=${apiKey}`
      )

      if (response.ok) {
        const data = await response.json()
        const videos = data.items
          .filter((item: any) => {
            const title = item.snippet.title.toLowerCase()
            return title.includes('anime') ||
                   title.includes('comic') ||
                   title.includes('marvel') ||
                   title.includes('dc') ||
                   title.includes('gaming') ||
                   title.includes('manga')
          })
          .map((item: any) => ({
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            viewCount: item.statistics.viewCount,
            publishedAt: item.snippet.publishedAt,
            videoId: item.id
          }))

        trends.push(...videos)
      }
    }

    return trends.slice(0, 15)
  } catch (error) {
    console.error('Error fetching YouTube trends:', error)
    return []
  }
}

export async function searchYouTubeClips(apiKey: string, query: string, maxResults: number = 5): Promise<any[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${apiKey}`
    )

    if (!response.ok) return []

    const data = await response.json()
    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt
    }))
  } catch (error) {
    console.error('Error searching YouTube:', error)
    return []
  }
}
