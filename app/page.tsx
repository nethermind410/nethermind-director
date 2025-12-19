'use client'

import { useState } from 'react'

interface ClipSource {
  videoTitle: string
  channelName: string
  videoUrl: string
  timestamp: string
  searchTerms: string[]
  reasoning: string
}

interface VideoIdea {
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

export default function Home() {
  const [claudeKey, setClaudeKey] = useState('')
  const [youtubeKey, setYoutubeKey] = useState('')
  const [ideas, setIdeas] = useState<VideoIdea[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateBriefs = async () => {
    if (!claudeKey || !youtubeKey) {
      setError('Please enter both API keys')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          claudeKey,
          youtubeKey,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate briefs')
      }

      const data = await response.json()
      setIdeas(data.ideas)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-nether-dark p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-nether-purple to-nether-cyan bg-clip-text text-transparent">
            NETHERMIND DIRECTOR
          </h1>
          <p className="text-gray-400 text-lg">
            Your AI content director. No options. Just decisions.
          </p>
        </div>

        {/* API Key Inputs */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Claude API Key
              </label>
              <input
                type="password"
                value={claudeKey}
                onChange={(e) => setClaudeKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-nether-purple text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                YouTube Data API Key
              </label>
              <input
                type="password"
                value={youtubeKey}
                onChange={(e) => setYoutubeKey(e.target.value)}
                placeholder="AIza..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-nether-cyan text-white"
              />
            </div>
          </div>

          <button
            onClick={generateBriefs}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-nether-purple to-nether-cyan text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'GENERATING BRIEFS...' : 'GENERATE 3 VIDEO BRIEFS'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>

        {/* Video Ideas */}
        {ideas.length > 0 && (
          <div className="space-y-8">
            {ideas.map((idea, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-nether-purple/20 text-nether-purple rounded-full text-sm font-semibold mb-3">
                    VIDEO {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold mb-2">{idea.topic}</h2>
                  <p className="text-gray-400 italic">{idea.reasoning}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-nether-cyan">Angle</h3>
                    <p className="text-gray-300">{idea.angle}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-nether-cyan">Hook</h3>
                    <p className="text-gray-300">{idea.hook}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-nether-cyan">Script</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{idea.script}</p>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-nether-cyan">Edit Structure</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {idea.editStructure.map((step, i) => (
                      <li key={i} className="text-gray-300">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-nether-cyan">Captions</h3>
                  <div className="space-y-1">
                    {idea.captions.map((caption, i) => (
                      <p key={i} className="text-gray-300 font-mono text-sm">"{caption}"</p>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-nether-cyan">Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {idea.hashtags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3 text-nether-purple">Clip Sources</h3>
                  <div className="space-y-4">
                    {idea.clipSources.map((clip, i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-white">{clip.videoTitle}</h4>
                            <p className="text-sm text-gray-400">{clip.channelName}</p>
                          </div>
                          <span className="px-2 py-1 bg-nether-purple/20 text-nether-purple rounded text-xs font-mono">
                            {clip.timestamp}
                          </span>
                        </div>
                        <a
                          href={clip.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-nether-cyan hover:underline text-sm break-all"
                        >
                          {clip.videoUrl}
                        </a>
                        <p className="text-gray-400 text-sm mt-2">{clip.reasoning}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {clip.searchTerms.map((term, j) => (
                            <span key={j} className="px-2 py-1 bg-gray-900 rounded text-xs text-gray-300">
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
