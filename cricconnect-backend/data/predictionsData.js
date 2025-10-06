const predictionsData = [
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
];

module.exports = predictionsData;