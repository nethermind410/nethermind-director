import { NextRequest, NextResponse } from 'next/server'
import { fetchRedditTrends, fetchMALTrends, fetchTMDBTrends, fetchYouTubeTrends, searchYouTubeClips } from '@/lib/trends'
import { VideoIdea, ClipSource } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { openaiKey, youtubeKey } = await request.json()

    if (!openaiKey) {
      return NextResponse.json(
        { error: 'Missing OpenAI API key' },
        { status: 400 }
      )
    }

    // Fetch all trends in parallel
    console.log('Fetching trends...')
    const [redditPosts, malAnime, tmdbMovies, youtubeTrends] = await Promise.all([
      fetchRedditTrends(),
      fetchMALTrends(),
      fetchTMDBTrends(),
      youtubeKey ? fetchYouTubeTrends(youtubeKey) : Promise.resolve([])
    ])

    // Prepare context
    const trendContext = {
      reddit: redditPosts.slice(0, 15),
      myAnimeList: malAnime.slice(0, 10),
      tmdb: tmdbMovies.slice(0, 10),
      youtube: youtubeTrends.slice(0, 10)
    }

    console.log('Generating ideas with OpenAI...')

    const prompt = `You are the content director for "Nethermind" - a YouTube/TikTok channel focused on comics, anime, gaming, movies, nerd culture with dark humor and "buff nerd" energy. Think ironic detachment + genuine passion.

CURRENT TRENDS:
${JSON.stringify(trendContext, null, 2)}

YOUR TASK: Make 3 DECISIONS (not suggestions) for 30-45 second vertical videos. Don't just follow trends - CONNECT DOTS across niches and find angles nobody else is doing.

For EACH video idea, provide:
1. Topic (specific, unique angle)
2. Angle (why this matters now, what makes it different)
3. Hook (first 3 seconds to stop the scroll)
4. Script (conversational, text-on-screen style, 30-45 seconds when read naturally)
5. Edit Structure (step-by-step guide: when to cut, transitions, pacing)
6. Captions (3-5 key text overlays that appear during the video)
7. Hashtags (mix of broad reach + niche)
8. Reasoning (why THIS idea, why NOW, what dots you're connecting)
9. Clip Search Queries (5-7 SPECIFIC search terms to find clips on YouTube - be creative with search terms to find the exact footage needed)

CRITICAL: For clip search queries, think like you're actually searching YouTube. Include:
- Character names + specific scene descriptions
- Movie/show title + key moment
- Meme formats that match the tone
- Reaction clips that fit the vibe
- B-roll search terms

Format your response as JSON ONLY, no markdown:
{
  "ideas": [
    {
      "topic": "string",
      "angle": "string",
      "hook": "string",
      "script": "string",
      "editStructure": ["step1", "step2", ...],
      "captions": ["caption1", "caption2", ...],
      "hashtags": ["#tag1", "#tag2", ...],
      "reasoning": "string",
      "clipSearchQueries": ["query1", "query2", ...]
    }
  ]
}

Make DECISIONS. Be BOLD. Connect unexpected dots.`

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: 0.9,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      })
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI API error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate ideas from OpenAI' },
        { status: 500 }
      )
    }

    const openaiData = await openaiResponse.json()
    const responseText = openaiData.choices[0].message.content

    // Parse JSON from Gemini's response
    let ideasWithQueries
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        ideasWithQueries = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError)
      console.log('Raw response:', responseText)
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    console.log('Searching for clips...')

    // For each idea, search YouTube for actual clips
    const ideasWithClips: VideoIdea[] = await Promise.all(
      ideasWithQueries.ideas.map(async (idea: any) => {
        const clipSources: ClipSource[] = []

        // Search for clips using the queries (only if YouTube key provided)
        if (youtubeKey) {
          for (const query of idea.clipSearchQueries || []) {
            try {
              const results = await searchYouTubeClips(youtubeKey, query, 2)

              for (const result of results.slice(0, 1)) {
                const timestamp = '0:00-0:15'

                clipSources.push({
                  videoTitle: result.title,
                  channelName: result.channelTitle,
                  videoUrl: `https://www.youtube.com/watch?v=${result.videoId}`,
                  timestamp,
                  searchTerms: [query],
                  reasoning: `Found using search: "${query}"`
                })
              }
            } catch (error) {
              console.error(`Failed to search for "${query}":`, error)
            }
          }
        }

        return {
          topic: idea.topic,
          angle: idea.angle,
          hook: idea.hook,
          script: idea.script,
          editStructure: idea.editStructure,
          captions: idea.captions,
          hashtags: idea.hashtags,
          reasoning: idea.reasoning,
          clipSources: clipSources.slice(0, 5)
        }
      })
    )

    console.log('Generation complete!')

    return NextResponse.json({
      ideas: ideasWithClips
    })
  } catch (error) {
    console.error('Error in generate route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
