import React, { useState, useEffect } from 'react'

// Dummy highlights data with YouTube video IDs
const dummyHighlights = [
  {
    id: 1,
    title: "NZ vs Australia - 3rd t20",
    videoId: "LJf55wg00uA",
    thumbnail: "https://i.ytimg.com/vi/LJf55wg00uA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC3I_aFv4egYfxsYG_1ZRvsNLFz-Q",
    duration: "20:34",
    views: "1.3M",
    uploadDate: "8 hours ago",
    category: "ODI"
  },
  {
    id: 2,
    title: "virat kohli 154* vs NZ Batting highlights | Kohli 's best knock vs NZ |",
    videoId: "X1M6ak4-alM",
    thumbnail: "https://i3.ytimg.com/vi/X1M6ak4-alM/hqdefault.jpg",
    duration: "3:44",
    views: "572k",
    uploadDate: "1 year ago",
    category: "TEST"
  },
  {
    id: 3,
    title: "Final Over Drama | IT20 IN FULL | England v Pakistan",
    videoId: "ukuNlWxcR2k",
    thumbnail: "https://i3.ytimg.com/vi/ukuNlWxcR2k/maxresdefault.jpg",
    duration: "3:07:35",
    views: "972k",
    uploadDate: "1 year ago",
    category: "T20"
  },
  {
    id: 4,
    title: "Unbelievable Cricket Catches Which Will Blow Your Mind | Feat. Deol, Maxwell, Jadeja & Stokes",
    videoId: "nHFWwCsskwk",
    thumbnail: "https://i3.ytimg.com/vi/nHFWwCsskwk/maxresdefault.jpg",
    duration: "39:29",
    views: "626k",
    uploadDate: "9 months ago",
    category: "Best Moments"
  },
  {
    id: 5,
    title: "Decoding Virat Kohli ‘Most Overhyped Shot Of The Century’ in 2022 T20 World Cup",
    videoId: "PQ_D5C2At48",
    thumbnail: "https://i3.ytimg.com/vi/PQ_D5C2At48/maxresdefault.jpg",
    duration: "18:40",
    views: "401K",
    uploadDate: "6 months ago",
    category: "T20"
  },
  {
    id: 6,
    title: "AB de Villiers fastest 100 of all time",
    videoId: "HK6B2da3DPA",
    thumbnail: "https://i3.ytimg.com/vi/HK6B2da3DPA/maxresdefault.jpg",
    duration: "11:52",
    views: "91M",
    uploadDate: "8 years ago",
    category: "Best Moments"
  },
  {
    id: 7,
    title: "Highlights | West Indies vs Sri Lanka | 6 Sixes in an Over & a Hat Trick! | 1st CG Insurance T20I",
    videoId: "MS18aoIDK0s",
    thumbnail: "https://i3.ytimg.com/vi/MS18aoIDK0s/maxresdefault.jpg",
    duration: "15:04",
    views: "12M",
    uploadDate: "4 year ago",
    category: "T20"
  },
  {
    id: 8,
    title: "15 CRAZIEST Unplayable Deliveries In Cricket History",
    videoId: "ZTk-mfCiYrc",
    thumbnail: "https://img.youtube.com/vi/YykjpeuMNEk/maxresdefault.jpg",
    duration: "6:44",
    views: "1.1M",
    uploadDate: "2 year ago",
    category: "Best Moments"
  },
  {
    id: 9,
    title: "Afghanistan vs Bangladesh | 2nd T20I | 2025 | Full Match Highlights",
    videoId: "zwYSgxEqoqk",
    thumbnail: "https://i3.ytimg.com/vi/zwYSgxEqoqk/maxresdefault.jpg",
    duration: "16:54",
    views: "719k",
    uploadDate: "1 days ago",
    category: "ODI"
  },
  {
    id: 10,
    title: "Suryavanshi slams rapid century against Aussies | Australia U19 vs India U19 2025",
    videoId: "Sdn37L3OI54",
    thumbnail: "http://i3.ytimg.com/vi/Sdn37L3OI54/hqdefault.jpg",
    duration: "4:51",
    views: "3.1m",
    uploadDate: "4 days ago",
    category: "T20"
  },
  {
    id: 11,
    title: "Virat Kohli pulls an Impossible Run Chase | 108*(58) vs RPS | 2nd IPL Century | Match 35 | IPL 2016",
    videoId: "gImXFaM1krA",
    thumbnail: "http://i3.ytimg.com/vi/gImXFaM1krA/hqdefault.jpg",
    duration: "14:57",
    views: "248k",
    uploadDate: "2 week ago",
    category: "IPL"
  },
  {
    id: 12,
    title: "Virat Kohli talks about the IPL 2025 win, Rajat Patidar, Jitesh Sharma and more",
    videoId: "jNQXAC9IVRw",
    thumbnail: "http://i3.ytimg.com/vi/WZPY3xVedQc/hqdefault.jpg",
    duration: "3:06",
    views: "3M",
    uploadDate: "4 months ago",
    category: "IPL"
  }
]

const Highlights = () => {
  const [highlights, setHighlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState(null)

  const categories = ['All', 'ODI', 'T20', 'TEST', 'IPL', 'Best Moments']

  // Simulate API call
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setHighlights(dummyHighlights)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHighlights()
  }, [])

  // Filter highlights by category
  const filteredHighlights = selectedCategory === 'All'
    ? highlights
    : highlights.filter(h => h.category === selectedCategory)

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      'ODI': 'bg-blue-500',
      'T20': 'bg-purple-500',
      'TEST': 'bg-green-500',
      'IPL': 'bg-orange-500',
      'Best Moments': 'bg-pink-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  // Loading Skeleton
  const SkeletonCard = () => (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-lg aspect-video mb-3"></div>
      <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
    </div>
  )

  // Video Card Component
  const VideoCard = ({ highlight }) => (
    <div
      onClick={() => setSelectedVideo(highlight)}
      className="group cursor-pointer transition-all duration-300 hover:scale-105"
    >
      {/* Thumbnail Container */}
      <div className="relative rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-red-500/20 transition-all duration-300">
        {/* Thumbnail Image */}
        <div className="aspect-video bg-gray-800 relative overflow-hidden">
          <img
            src={highlight.thumbnail}
            alt={highlight.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/640x360/1f2937/ffffff?text=Cricket+Highlights'
            }}
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
            {highlight.duration}
          </div>

          {/* Category Badge */}
          <div className={`absolute top-2 left-2 ${getCategoryColor(highlight.category)} text-white text-xs font-bold px-2 py-1 rounded`}>
            {highlight.category}
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-3">
        <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-red-500 transition-colors duration-200 mb-1">
          {highlight.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{highlight.views} views</span>
          <span>•</span>
          <span>{highlight.uploadDate}</span>
        </div>
      </div>
    </div>
  )

  // Video Modal
  const VideoModal = () => {
    if (!selectedVideo) return null

    return (
      <div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedVideo(null)}
      >
        <div 
          className="relative w-full max-w-5xl bg-gray-900 rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video Player */}
          <div className="aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className={`${getCategoryColor(selectedVideo.category)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                {selectedVideo.category}
              </span>
            </div>
            <h2 className="text-white font-bold text-2xl mb-3">{selectedVideo.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {selectedVideo.views} views
              </span>
              <span>•</span>
              <span>{selectedVideo.uploadDate}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-4xl">🎬</span>
            Match Highlights
          </h1>
          <p className="text-gray-400 text-lg">Watch the best cricket moments and highlights</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/50 scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {filteredHighlights.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🎬</span>
                <p className="text-gray-400 text-xl">No highlights found for this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredHighlights.map((highlight) => (
                  <VideoCard key={highlight.id} highlight={highlight} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 text-center">
          <h3 className="text-white font-bold text-xl mb-2">🔔 Never Miss a Moment</h3>
          <p className="text-red-100 mb-4">Subscribe to get notifications for new highlights</p>
          <button className="bg-white text-red-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal />
    </div>
  )
}

export default Highlights