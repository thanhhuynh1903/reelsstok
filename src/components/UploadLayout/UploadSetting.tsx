"use client"

import { useState } from "react"
import { Bell, Share2, TrendingUp, Eye, Heart, MessageCircle } from "lucide-react"

interface VideoData {
  title: string
  description: string
  tags: string[]
  category: string
  visibility: "public" | "private" | "unlisted"
  allowComments: boolean
  allowDownload: boolean
  thumbnail: string
  scheduledDate?: Date
}

interface PublishSettingsProps {
  videoData: VideoData
  onUpdate: (data: VideoData) => void
  onPublish: () => void
}

export function PublishSettings({ videoData, onUpdate, onPublish }: PublishSettingsProps) {
  const [notifySubscribers, setNotifySubscribers] = useState(true)
  const [addToPlaylist, setAddToPlaylist] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState("")

  const playlists = ["My Shorts Collection", "Gaming Videos", "Tutorials", "Funny Moments"]

  const estimatedReach = {
    views: "1.2K - 5.8K",
    engagement: "85 - 320",
    shares: "12 - 45",
  }

  const isReadyToPublish = videoData.title.trim() && videoData.category

  return (
    <div className="h-full flex">
      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full md:w-[37%] max-w-md">
          {/* Mobile Preview */}
          <div className="bg-gray-900 rounded-3xl p-4 border border-gray-700">
            <div className="bg-black rounded-2xl overflow-hidden aspect-[9/16]">
              <div className="relative h-full">
                <img
                  src={videoData.thumbnail || "/placeholder.svg?height=600&width=300"}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />

                {/* Overlay UI */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  {/* Top UI */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="text-white text-sm">For You</div>
                    <div className="text-white text-sm">Following</div>
                  </div>

                  {/* Bottom UI */}
                  <div className="absolute bottom-4 left-4 right-16">
                    <div className="space-y-2">
                      <h3 className="text-white font-medium text-sm line-clamp-2">
                        {videoData.title || "Your video title"}
                      </h3>
                      <p className="text-gray-300 text-xs line-clamp-2">
                        {videoData.description || "Your video description"}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {videoData.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-purple-400 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Side Actions */}
                  <div className="absolute bottom-4 right-4 flex flex-col space-y-4">
                    <div className="flex flex-col items-center">
                      <Heart className="w-6 h-6 text-white" />
                      <span className="text-white text-xs">1.2K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                      <span className="text-white text-xs">89</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Share2 className="w-6 h-6 text-white" />
                      <span className="text-white text-xs">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="w-96 border-l border-gray-800 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Publish Summary */}
          <div className="bg-gray-900/50 rounded-xl p-4">
            <h3 className="font-medium text-white mb-3">Ready to Publish</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Title:</span>
                <span className="text-white">{videoData.title ? "✓" : "Missing"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="text-white">{videoData.category ? "✓" : "Missing"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Visibility:</span>
                <span className="text-white capitalize">{videoData.visibility}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tags:</span>
                <span className="text-white">{videoData.tags.length} added</span>
              </div>
            </div>
          </div>

          {/* Estimated Performance */}
          <div className="bg-purple-600/10 border border-purple-600/20 rounded-xl p-4">
            <h3 className="font-medium text-purple-400 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Estimated Reach
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Views</span>
                </div>
                <span className="text-white font-medium">{estimatedReach.views}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Engagement</span>
                </div>
                <span className="text-white font-medium">{estimatedReach.engagement}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Shares</span>
                </div>
                <span className="text-white font-medium">{estimatedReach.shares}</span>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="font-medium text-white mb-3">Notification Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifySubscribers}
                  onChange={(e) => setNotifySubscribers(e.target.checked)}
                  className="rounded"
                />
                <Bell className="w-4 h-4 text-gray-400" />
                <div>
                  <div className="text-white">Notify subscribers</div>
                  <div className="text-xs text-gray-400">Send notification to your 1.2K subscribers</div>
                </div>
              </label>
            </div>
          </div>

          {/* Playlist */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={addToPlaylist}
                onChange={(e) => setAddToPlaylist(e.target.checked)}
                className="rounded"
              />
              <span className="text-white">Add to playlist</span>
            </label>

            {addToPlaylist && (
              <select
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="">Select a playlist</option>
                {playlists.map((playlist) => (
                  <option key={playlist} value={playlist}>
                    {playlist}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Scheduled Publishing */}
          {videoData.scheduledDate && (
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-xl p-4">
              <h3 className="font-medium text-blue-400 mb-2">Scheduled for</h3>
              <p className="text-white">
                {videoData.scheduledDate.toLocaleDateString()} at {videoData.scheduledDate.toLocaleTimeString()}
              </p>
            </div>
          )}

          {/* Publish Button */}
          <button
            onClick={onPublish}
            disabled={!isReadyToPublish}
            className={`
              w-full py-4 rounded-xl font-medium transition-all
              ${
                isReadyToPublish
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {videoData.scheduledDate ? "Schedule Video" : "Publish Now"}
          </button>

          {!isReadyToPublish && (
            <p className="text-sm text-red-400 text-center">Please add a title and select a category to publish</p>
          )}
        </div>
      </div>
    </div>
  )
}
