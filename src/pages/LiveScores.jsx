import React, { useState, useEffect } from 'react'

// Dummy cricket match data (simulating API response)
const dummyMatchData = [
  {
    id: 1,
    team1: {
      name: "India",
      flag: "🇮🇳",
      score: "287/6",
      overs: "48.3"
    },
    team2: {
      name: "Australia",
      flag: "🇦🇺",
      score: "245/10",
      overs: "45.2"
    },
    status: "LIVE",
    venue: "Melbourne Cricket Ground",
    matchType: "ODI",
    tossInfo: "India won the toss and chose to bat",
    currentRunRate: "5.92"
  },
  {
    id: 2,
    team1: {
      name: "England",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      score: "178/4",
      overs: "20.0"
    },
    team2: {
      name: "Pakistan",
      flag: "🇵🇰",
      score: "175/8",
      overs: "20.0"
    },
    status: "COMPLETED",
    venue: "Lord's Cricket Ground",
    matchType: "T20",
    result: "England won by 6 wickets",
    currentRunRate: "8.90"
  },
  {
    id: 3,
    team1: {
      name: "South Africa",
      flag: "🇿🇦",
      score: "312/7",
      overs: "88.0"
    },
    team2: {
      name: "New Zealand",
      flag: "🇳🇿",
      score: "198/3",
      overs: "56.0"
    },
    status: "LIVE",
    venue: "Cape Town Stadium",
    matchType: "TEST",
    tossInfo: "South Africa won the toss and chose to bat",
    currentRunRate: "3.55"
  },
  {
    id: 4,
    team1: {
      name: "West Indies",
      flag: "🏴",
      score: "245/9",
      overs: "50.0"
    },
    team2: {
      name: "Sri Lanka",
      flag: "🇱🇰",
      score: "248/5",
      overs: "47.3"
    },
    status: "COMPLETED",
    venue: "Kensington Oval",
    matchType: "ODI",
    result: "Sri Lanka won by 5 wickets",
    currentRunRate: "5.22"
  },
  {
    id: 5,
    team1: {
      name: "Bangladesh",
      flag: "🇧🇩",
      score: "156/8",
      overs: "20.0"
    },
    team2: {
      name: "Afghanistan",
      flag: "🇦🇫",
      score: "132/7",
      overs: "18.2"
    },
    status: "LIVE",
    venue: "Shere Bangla Stadium",
    matchType: "T20",
    tossInfo: "Bangladesh won the toss and chose to bat",
    currentRunRate: "7.80"
  },
  {
    id: 6,
    team1: {
      name: "Ireland",
      flag: "🇮🇪",
      score: "198/10",
      overs: "48.1"
    },
    team2: {
      name: "Zimbabwe",
      flag: "🇿🇼",
      score: "156/6",
      overs: "35.0"
    },
    status: "LIVE",
    venue: "Harare Sports Club",
    matchType: "ODI",
    tossInfo: "Ireland won the toss and chose to bat",
    currentRunRate: "4.11"
  }
]

const LiveScores = () => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('ALL')

  // Simulate API call
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Simulate random API failure (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Failed to fetch match data. Please try again.')
        }
        
        setMatches(dummyMatchData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  // Filter matches
  const filteredMatches = filter === 'ALL' 
    ? matches 
    : matches.filter(match => match.status === filter)

  // Get status badge style
  const getStatusBadge = (status) => {
    if (status === 'LIVE') {
      return 'bg-red-500 text-white animate-pulse'
    }
    return 'bg-gray-600 text-white'
  }

  // Get match type badge color
  const getMatchTypeBadge = (type) => {
    const colors = {
      'T20': 'bg-purple-500',
      'ODI': 'bg-blue-500',
      'TEST': 'bg-green-500'
    }
    return colors[type] || 'bg-gray-500'
  }

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🏏</span>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading live scores...</p>
    </div>
  )

  // Error Component
  const ErrorDisplay = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <span className="text-5xl mb-4 block">⚠️</span>
          <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )

  // Match Card Component
  const MatchCard = ({ match }) => (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] border border-gray-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getMatchTypeBadge(match.matchType)}`}>
            {match.matchType}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(match.status)}`}>
            {match.status}
          </span>
        </div>
        <div className="text-white text-xs opacity-80">
          📍 {match.venue}
        </div>
      </div>

      {/* Teams Section */}
      <div className="p-6">
        {/* Team 1 */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{match.team1.flag}</span>
            <div>
              <h3 className="text-white font-bold text-xl">{match.team1.name}</h3>
              <p className="text-gray-400 text-sm">{match.team1.overs} overs</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-3xl">{match.team1.score}</p>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{match.team2.flag}</span>
            <div>
              <h3 className="text-white font-bold text-xl">{match.team2.name}</h3>
              <p className="text-gray-400 text-sm">{match.team2.overs} overs</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-3xl">{match.team2.score}</p>
          </div>
        </div>

        {/* Match Info */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          {match.status === 'LIVE' ? (
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-400">{match.tossInfo}</p>
              <p className="text-blue-400 font-semibold">CRR: {match.currentRunRate}</p>
            </div>
          ) : (
            <p className="text-green-400 font-semibold text-sm">{match.result}</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-4xl">🏏</span>
            Live Scores
          </h1>
          <p className="text-gray-400 text-lg">Stay updated with real-time cricket action</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['ALL', 'LIVE', 'COMPLETED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                filter === status
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {status === 'ALL' ? 'All Matches' : status === 'LIVE' ? '🔴 Live' : '✓ Completed'}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay />
        ) : (
          <>
            {filteredMatches.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🏏</span>
                <p className="text-gray-400 text-xl">No matches found for this filter</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default LiveScores