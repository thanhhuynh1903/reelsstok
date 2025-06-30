"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SidebarLayout } from "@/components/ui/sidebar-layout"
import VideoCard from "@/components/video-card"
import { Search, Grid, List, TrendingUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const allVideos = [
  {
    id: 1,
    title: "Amazing Dance Moves",
    creator: "DanceQueen",
    views: "2.1M",
    likes: "45K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:15",
    category: "Dance",
    uploadDate: "2024-01-15",
    trending: true,
  },
  {
    id: 2,
    title: "Cooking Hack: Perfect Pasta",
    creator: "ChefMaster",
    views: "890K",
    likes: "23K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:30",
    category: "Food",
    uploadDate: "2024-01-14",
    trending: false,
  },
  {
    id: 3,
    title: "Pet Funny Moments",
    creator: "PetLover",
    views: "1.5M",
    likes: "67K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:22",
    category: "Pets",
    uploadDate: "2024-01-13",
    trending: true,
  },
  {
    id: 4,
    title: "Travel Vlog: Tokyo Streets",
    creator: "Wanderer",
    views: "3.2M",
    likes: "89K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:45",
    category: "Travel",
    uploadDate: "2024-01-12",
    trending: true,
  },
  {
    id: 5,
    title: "Tech Review: Latest Phone",
    creator: "TechGuru",
    views: "756K",
    likes: "34K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:38",
    category: "Technology",
    uploadDate: "2024-01-11",
    trending: false,
  },
  {
    id: 6,
    title: "Fashion Tips for Winter",
    creator: "StyleIcon",
    views: "1.8M",
    likes: "56K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:28",
    category: "Fashion",
    uploadDate: "2024-01-10",
    trending: false,
  },
]

export default function VideosPage() {
  const [filteredVideos, setFilteredVideos] = useState(allVideos)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("trending")
  const [searchQuery, setSearchQuery] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)
  const videoGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate video cards on scroll
      gsap.fromTo(
        ".video-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: videoGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate header elements
      gsap.fromTo(".page-header", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
    }, containerRef)

    return () => ctx.revert()
  }, [filteredVideos])

  useEffect(() => {
    let filtered = allVideos

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort videos
    switch (sortBy) {
      case "trending":
        filtered = filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        break
      case "recent":
        filtered = filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        break
      case "views":
        filtered = filtered.sort((a, b) => {
          const aViews = Number.parseFloat(a.views.replace(/[KM]/g, "")) * (a.views.includes("M") ? 1000000 : 1000)
          const bViews = Number.parseFloat(b.views.replace(/[KM]/g, "")) * (b.views.includes("M") ? 1000000 : 1000)
          return bViews - aViews
        })
        break
    }

    setFilteredVideos(filtered)
  }, [sortBy, searchQuery])

  return (
    <SidebarLayout>
      <div ref={containerRef} className="min-h-screen bg-black text-white">
        <div className="p-6">
          {/* Page Header */}
          <div className="page-header flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Discover Videos</h1>
              <p className="text-gray-400">Explore {filteredVideos.length} amazing videos from creators worldwide</p>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors w-full md:w-64"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="trending">🔥 Trending</option>
                <option value="recent">🕒 Recent</option>
                <option value="views">👁️ Most Viewed</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Videos Grid/List */}
          <div ref={videoGridRef}>
            {filteredVideos.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                    : "space-y-4"
                }
              >
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className={viewMode === "list" ? "flex space-x-4 bg-gray-900/50 rounded-xl p-4" : ""}
                  >
                    <VideoCard video={video} />
                    {viewMode === "list" && (
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span className="bg-gray-800 px-2 py-1 rounded">{video.category}</span>
                          {video.trending && (
                            <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm">
                          Uploaded {new Date(video.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search criteria</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredVideos.length > 0 && (
            <div className="text-center py-8">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Load More Videos
              </button>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}
