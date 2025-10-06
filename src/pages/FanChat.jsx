import React, { useState, useEffect, useRef } from 'react'
import { chatAPI } from '../services/api'

// Fallback initial messages if API fails
const fallbackMessages = [
  {
    id: 1,
    username: "CricketFan101",
    message: "What a match! India is on fire today! 🔥",
    timestamp: new Date(Date.now() - 300000),
    isOwn: false
  },
  {
    id: 2,
    username: "AussieSupporter",
    message: "Australia will make a comeback, just wait and watch!",
    timestamp: new Date(Date.now() - 240000),
    isOwn: false
  },
  {
    id: 3,
    username: "You",
    message: "This is going to be an exciting finish!",
    timestamp: new Date(Date.now() - 180000),
    isOwn: true
  },
  {
    id: 4,
    username: "KohliTheKing",
    message: "Kohli's form is absolutely insane right now 👑",
    timestamp: new Date(Date.now() - 120000),
    isOwn: false
  },
  {
    id: 5,
    username: "SpinWizard",
    message: "The spinners are going to be key in the second innings",
    timestamp: new Date(Date.now() - 60000),
    isOwn: false
  }
]

const FanChat = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [username] = useState('You')
  const [onlineUsers] = useState(1247)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Fetch messages from API on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const result = await chatAPI.getMessages(100)
        
        if (result.success && result.data.length > 0) {
          // Transform API data to match component format
          const transformedMessages = result.data.map((msg, index) => ({
            id: msg._id || index + 1,
            username: msg.username,
            message: msg.message,
            timestamp: new Date(msg.timestamp),
            isOwn: msg.isOwn
          }))
          setMessages(transformedMessages)
        } else {
          // Use fallback messages if no data
          setMessages(fallbackMessages)
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        // Use fallback messages on error
        setMessages(fallbackMessages)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  // Scroll to bottom when new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Format timestamp
  const formatTimestamp = (date) => {
    const now = new Date()
    const diff = Math.floor((now - date) / 1000) // difference in seconds

    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (inputMessage.trim() === '') return

    try {
      // Post message to API
      const result = await chatAPI.postMessage({
        username: username.trim(),
        message: inputMessage.trim(),
        isOwn: true
      })

      if (result.success) {
        // Transform API response to match component format
        const newMessage = {
          id: result.data._id || messages.length + 1,
          username: result.data.username,
          message: result.data.message,
          timestamp: new Date(result.data.timestamp),
          isOwn: result.data.isOwn
        }

        setMessages([...messages, newMessage])
        setInputMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback: Add message locally even if API fails
      const newMessage = {
        id: messages.length + 1,
        username: username.trim(),
        message: inputMessage.trim(),
        timestamp: new Date(),
        isOwn: true
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  // Get avatar color based on username
  const getAvatarColor = (username) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-teal-500'
    ]
    const index = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  // Message Bubble Component
  const MessageBubble = ({ message }) => {
    const isOwn = message.isOwn
    const avatarColor = getAvatarColor(message.username)

    return (
      <div className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-sm`}>
          {message.username.charAt(0).toUpperCase()}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
          {/* Username */}
          <div className={`flex items-center gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-xs font-semibold text-gray-400">{message.username}</span>
            <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
          </div>

          {/* Message Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl break-words ${
              isOwn
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm'
                : 'bg-gray-800 text-gray-100 rounded-tl-sm'
            }`}
          >
            <p className="text-sm leading-relaxed">{message.message}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                <span className="text-2xl">💬</span>
                Fan Chat
              </h1>
              <p className="text-blue-100 text-sm">Connect with cricket fans worldwide</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-white font-semibold text-sm">{onlineUsers} online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-900 shadow-2xl rounded-b-xl overflow-hidden">
          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-6 space-y-1 scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 #1F2937'
            }}
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 bg-gray-950 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              {/* Input Box */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-full px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  title="Add emoji"
                >
                  😊
                </button>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={inputMessage.trim() === ''}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                  inputMessage.trim() === ''
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/50'
                }`}
              >
                <span>Send</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>

            {/* Tips */}
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <span>💡 Press Enter to send</span>
              <span>•</span>
              <span>Shift + Enter for new line</span>
            </div>
          </div>
        </div>

        {/* Chat Rules */}
        <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">📋</span>
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">Chat Guidelines</h3>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Be respectful to all cricket fans</li>
                <li>• No spam or inappropriate content</li>
                <li>• Keep discussions cricket-related</li>
                <li>• Have fun and enjoy the game! 🏏</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setInputMessage('Great match! 🔥')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-full transition-colors"
          >
            🔥 Great match!
          </button>
          <button
            onClick={() => setInputMessage('What a shot! 🏏')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-full transition-colors"
          >
            🏏 What a shot!
          </button>
          <button
            onClick={() => setInputMessage('Incredible bowling! 👏')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-full transition-colors"
          >
            👏 Incredible bowling!
          </button>
          <button
            onClick={() => setInputMessage('This is intense! 😮')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-full transition-colors"
          >
            😮 This is intense!
          </button>
        </div>
      </div>
    </div>
  )
}

export default FanChat