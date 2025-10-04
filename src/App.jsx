import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import LiveScores from './pages/LiveScores'
import Predictions from './pages/Predictions'
import FanChat from './pages/FanChat'
import Highlights from './pages/Highlights'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'live-scores':
        return <LiveScores />
      case 'predictions':
        return <Predictions />
      case 'fan-chat':
        return <FanChat />
      case 'highlights':
        return <Highlights />
      default:
        return <Home />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App