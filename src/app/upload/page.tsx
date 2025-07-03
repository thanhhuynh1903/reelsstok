"use client"

import { useState } from "react"
import { UploadLayout } from "@/components/UploadLayout/UploadLayout"
import { Upload, Video, TrendingUp, Users } from "lucide-react"

export default function UploadPage() {
  const [showUpload, setShowUpload] = useState(false)

  const stats = [
    {
      label: "Total Uploads",
      value: "156",
      icon: Video,
      color: "text-purple-400",
    },
    {
      label: "Total Views",
      value: "2.1M",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      label: "Subscribers",
      value: "52.3K",
      icon: Users,
      color: "text-blue-400",
    },
  ]

  const recentUploads = [
    {
      id: 1,
      title: "Epic Minecraft Build",
      thumbnail: "/placeholder.svg?height=100&width=100",
      views: "12.5K",
      status: "Published",
      uploadDate: "2 hours ago",
    },
    {
      id: 2,
      title: "Cooking Tutorial",
      thumbnail: "/placeholder.svg?height=100&width=100",
      views: "8.9K",
      status: "Published",
      uploadDate: "1 day ago",
    },
    {
      id: 3,
      title: "Dance Challenge",
      thumbnail: "/placeholder.svg?height=100&width=100",
      views: "15.2K",
      status: "Published",
      uploadDate: "3 days ago",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upload Center</h1>
          <p className="text-gray-400 text-lg">Share your creativity with the world</p>
        </div>

        {/* Upload Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
          >
            <Upload className="w-6 h-6" />
            <span>Upload Short Video</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-gray-900/50 rounded-xl p-6 text-center">
                <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Recent Uploads */}
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Uploads</h2>
          <div className="space-y-4">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                <img
                  src={upload.thumbnail || "/placeholder.svg"}
                  alt={upload.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-white">{upload.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <span>{upload.views} views</span>
                    <span>•</span>
                    <span>{upload.uploadDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-sm">{upload.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && <UploadLayout onClose={() => setShowUpload(false)} />}
    </div>
  )
}
