"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VideoCard from "@/components/video-card"
import { Filter, Grid, List, Upload } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Video {
  id: number
  title: string
  creator: string
  views: string
  likes: string
  thumbnail: string
  duration: string
  uploadDate: string
  category: string
}

interface ChannelVideosProps {
  channelData: {
    displayName: string
  }
  isOwnChannel: boolean
}

export function ChannelVideos({ channelData, isOwnChannel }: ChannelVideosProps) {
  const videos: Video[] = ([
    {
      id: 1,
      title: "Epic Minecraft Castle Build Tutorial",
      creator: channelData.displayName,
      views: "2.1M",
      likes: "89K",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "15:32",
      uploadDate: "2024-01-15",
      category: "Tutorial",
    },
    {
      id: 2,
      title: "Advanced Redstone Mechanisms",
      creator: channelData.displayName,
      views: "1.5M",
      likes: "67K",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "22:18",
      uploadDate: "2024-01-10",
      category: "Tutorial",
    },
    {
      id: 3,
      title: "Building Tips for Beginners",
      creator: channelData.displayName,
      views: "890K",
      likes: "45K",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "12:45",
      uploadDate: "2024-01-05",
      category: "Guide",
    },
    {
      id: 4,
      title: "Survival World Tour",
      creator: channelData.displayName,
      views: "3.2M",
      likes: "156K",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "28:30",
      uploadDate: "2023-12-28",
      category: "Showcase",
    },
    {
      id: 5,
      title: "Modded Minecraft Adventures",
      creator: channelData.displayName,
      views: "756K",
      likes: "34K",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "35:12",
      uploadDate: "2023-12-20",
      category: "Gameplay",
    },
    {
      id: 6,
      title: "Community Build Challenge",
      creator: channelData.displayName,
      views: "1.8M",
      likes: "78K",
      thumbnail: "/placeholder.svg?height=400&width=600",
      duration: "18:45",
      uploadDate: "2023-12-15",
      category: "Community",
    },
  ])

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".video-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, gridRef)

    return () => ctx.revert()
  }, [videos, viewMode])

  const categories = ["all", "Tutorial", "Guide", "Showcase", "Gameplay", "Community"]

  const filteredVideos = videos.filter((video) => filterBy === "all" || video.category === filterBy)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Videos</h2>
          <p className="text-gray-400">{filteredVideos.length} videos</p>
        </div>

        {isOwnChannel && (
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2 self-start">
            <Upload className="w-4 h-4" />
            <span>Upload Video</span>
          </button>
        )}
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 bg-gray-900/50 rounded-xl p-4">
        {/* Category Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterBy(category)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                  ${filterBy === category ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
                `}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Popular</option>
            <option value="views">Most Viewed</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`
                p-2 rounded transition-colors
                ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}
              `}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`
                p-2 rounded transition-colors
                ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}
              `}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Videos Grid/List */}
      <div ref={gridRef}>
        {filteredVideos.length > 0 ? (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredVideos.map((video) => (
              <div key={video.id} className={viewMode === "list" ? "flex space-x-4 bg-gray-900/50 rounded-xl p-4" : ""}>
                <VideoCard video={video} />
                {viewMode === "list" && (
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className="bg-gray-800 px-2 py-1 rounded">{video.category}</span>
                      <span>•</span>
                      <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                    </div>
                    {isOwnChannel && (
                      <div className="flex items-center space-x-2">
                        <button className="text-purple-400 hover:text-purple-300 text-sm">Edit</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your filters</p>
            <button
              onClick={() => setFilterBy("all")}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl transition-colors"
            >
              Show All Videos
            </button>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredVideos.length > 0 && (
        <div className="text-center py-8">
          <button className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-full font-medium transition-colors">
            Load More Videos
          </button>
        </div>
      )}
    </div>
  )
}
