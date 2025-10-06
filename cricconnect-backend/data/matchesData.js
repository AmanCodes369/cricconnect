const matchesData = [
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
    currentRunRate: "5.92",
    date: new Date().toISOString()
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
    currentRunRate: "8.90",
    date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
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
    currentRunRate: "3.55",
    date: new Date().toISOString()
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
    currentRunRate: "5.22",
    date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
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
    currentRunRate: "7.80",
    date: new Date().toISOString()
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
    currentRunRate: "4.11",
    date: new Date().toISOString()
  }
];

module.exports = matchesData;