import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

// Dummy prediction data
const dummyPredictions = [
  {
    id: 1,
    team1: {
      name: "India",
      flag: "🇮🇳",
      winProbability: 68
    },
    team2: {
      name: "Australia",
      flag: "🇦🇺",
      winProbability: 32
    },
    matchType: "ODI",
    venue: "Melbourne Cricket Ground",
    date: "Oct 15, 2025",
    playerOfMatch: {
      name: "Virat Kohli",
      team: "India",
      flag: "🇮🇳",
      probability: 35,
      stats: "Avg: 52.4 | SR: 89.2"
    },
    keyFactors: [
      "Recent form favors India",
      "Home advantage for Australia",
      "Head-to-head: India leads 6-4"
    ]
  },
  {
    id: 2,
    team1: {
      name: "England",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      winProbability: 55
    },
    team2: {
      name: "Pakistan",
      flag: "🇵🇰",
      winProbability: 45
    },
    matchType: "T20",
    venue: "Lord's Cricket Ground",
    date: "Oct 18, 2025",
    playerOfMatch: {
      name: "Jos Buttler",
      team: "England",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      probability: 42,
      stats: "Avg: 45.8 | SR: 142.5"
    },
    keyFactors: [
      "England's batting depth",
      "Pakistan's strong bowling attack",
      "Pitch conditions favor batsmen"
    ]
  },
  {
    id: 3,
    team1: {
      name: "South Africa",
      flag: "🇿🇦",
      winProbability: 72
    },
    team2: {
      name: "New Zealand",
      flag: "🇳🇿",
      winProbability: 28
    },
    matchType: "TEST",
    venue: "Cape Town Stadium",
    date: "Oct 20, 2025",
    playerOfMatch: {
      name: "Kagiso Rabada",
      team: "South Africa",
      flag: "🇿🇦",
      probability: 38,
      stats: "Avg: 4.2 wkts/match | ER: 2.8"
    },
    keyFactors: [
      "South Africa's pace attack",
      "Home ground advantage",
      "Recent winning streak"
    ]
  },
  {
    id: 4,
    team1: {
      name: "West Indies",
      flag: "🏴",
      winProbability: 41
    },
    team2: {
      name: "Sri Lanka",
      flag: "🇱🇰",
      winProbability: 59
    },
    matchType: "ODI",
    venue: "Kensington Oval",
    date: "Oct 22, 2025",
    playerOfMatch: {
      name: "Wanindu Hasaranga",
      team: "Sri Lanka",
      flag: "🇱🇰",
      probability: 33,
      stats: "Avg: 3.8 wkts/match | ER: 5.2"
    },
    keyFactors: [
      "Sri Lanka's spin advantage",
      "West Indies struggling with form",
      "Pitch favors spinners"
    ]
  }
]

const Predictions = () => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMatch, setSelectedMatch] = useState(null)

  // Simulate API call
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1200))
        setPredictions(dummyPredictions)
        setSelectedMatch(dummyPredictions[0])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  // Get match type badge color
  const getMatchTypeBadge = (type) => {
    const colors = {
      'T20': 'bg-purple-500',
      'ODI': 'bg-blue-500',
      'TEST': 'bg-green-500'
    }
    return colors[type] || 'bg-gray-500'
  }

  // Custom label for pie chart
  const renderCustomLabel = ({ name, percent }) => {
    return `${(percent * 100).toFixed(0)}%`
  }

  // Loading Spinner
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🔮</span>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading predictions...</p>
    </div>
  )

  // Win Probability Card
  const WinProbabilityCard = ({ match }) => {
    const pieData = [
      { name: match.team1.name, value: match.team1.winProbability, color: '#3b82f6' },
      { name: match.team2.name, value: match.team2.winProbability, color: '#ef4444' }
    ]

    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-xl">Win Probability</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getMatchTypeBadge(match.matchType)}`}>
            {match.matchType}
          </span>
        </div>

        {/* Pie Chart */}
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Teams Progress Bars */}
        <div className="space-y-4">
          {/* Team 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{match.team1.flag}</span>
                <span className="text-white font-semibold">{match.team1.name}</span>
              </div>
              <span className="text-blue-400 font-bold text-lg">{match.team1.winProbability}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${match.team1.winProbability}%` }}
              ></div>
            </div>
          </div>

          {/* Team 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{match.team2.flag}</span>
                <span className="text-white font-semibold">{match.team2.name}</span>
              </div>
              <span className="text-red-400 font-bold text-lg">{match.team2.winProbability}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${match.team2.winProbability}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Venue</p>
              <p className="text-white font-semibold">{match.venue}</p>
            </div>
            <div>
              <p className="text-gray-400">Date</p>
              <p className="text-white font-semibold">{match.date}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Player of Match Prediction Card
  const PlayerPredictionCard = ({ match }) => {
    const player = match.playerOfMatch

    return (
      <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-6 border border-purple-700 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🏆</span>
          <h3 className="text-white font-bold text-xl">Player of the Match</h3>
        </div>

        <div className="bg-black/30 rounded-lg p-6 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl">
              {player.flag}
            </div>
            <div>
              <h4 className="text-white font-bold text-2xl">{player.name}</h4>
              <p className="text-purple-200">{player.team}</p>
            </div>
          </div>

          {/* Probability Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-200 text-sm">Prediction Confidence</span>
              <span className="text-yellow-400 font-bold text-lg">{player.probability}%</span>
            </div>
            <div className="w-full bg-purple-950 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${player.probability}%` }}
              >
                <span className="text-xs font-bold text-purple-900">★</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-purple-950/50 rounded-lg p-3">
            <p className="text-purple-200 text-sm mb-1">Key Stats</p>
            <p className="text-white font-semibold">{player.stats}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-purple-200 text-sm">
          <span>🤖</span>
          <span>AI-powered prediction based on recent performance</span>
        </div>
      </div>
    )
  }

  // Key Factors Card
  const KeyFactorsCard = ({ match }) => (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📊</span>
        <h3 className="text-white font-bold text-xl">Key Factors</h3>
      </div>

      <ul className="space-y-3">
        {match.keyFactors.map((factor, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-green-400 mt-1">✓</span>
            <span className="text-gray-300">{factor}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  // Match Selection Tabs
  const MatchTabs = () => (
    <div className="flex flex-wrap gap-3 mb-8">
      {predictions.map((match) => (
        <button
          key={match.id}
          onClick={() => setSelectedMatch(match)}
          className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
            selectedMatch?.id === match.id
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <span>{match.team1.flag}</span>
          <span className="text-xs">vs</span>
          <span>{match.team2.flag}</span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-4xl">🔮</span>
            Match Predictions
          </h1>
          <p className="text-gray-400 text-lg">AI-powered cricket match predictions and analysis</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Match Selection */}
            <MatchTabs />

            {/* Predictions Grid */}
            {selectedMatch && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Win Probability */}
                <div className="lg:col-span-2">
                  <WinProbabilityCard match={selectedMatch} />
                </div>

                {/* Player Prediction */}
                <PlayerPredictionCard match={selectedMatch} />

                {/* Key Factors */}
                <KeyFactorsCard match={selectedMatch} />
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm text-center">
                ⚠️ These predictions are generated using AI and historical data. 
                Actual match outcomes may vary based on various factors including weather, pitch conditions, and player form.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Predictions