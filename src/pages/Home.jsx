import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to CricConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your ultimate destination for live cricket scores, match predictions, 
            fan discussions, and exciting highlights. Stay connected with the game you love!
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Live Scores</h3>
            <p className="text-gray-600">Get real-time updates from matches around the world</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold mb-2">Predictions</h3>
            <p className="text-gray-600">AI-powered match predictions and analysis</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Fan Chat</h3>
            <p className="text-gray-600">Connect with fellow cricket enthusiasts</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home