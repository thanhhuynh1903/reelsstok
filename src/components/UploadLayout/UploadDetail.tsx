"use client"

import type React from "react"

import { useState } from "react"
import { Hash, EyeOff, MessageCircle, Download, Calendar, Globe, Lock } from "lucide-react"

interface VideoFile {
  file: File
  url: string
  duration: number
  thumbnail: string
  size: number
}

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

interface VideoDetailsProps {
  videoData: VideoData
  onUpdate: (data: VideoData) => void
  videoFile: VideoFile | null
}

export function VideoDetails({ videoData, onUpdate, videoFile }: VideoDetailsProps) {
  const [newTag, setNewTag] = useState("")
  const [showSchedule, setShowSchedule] = useState(false)

  const categories = [
    "Gaming",
    "Entertainment",
    "Music",
    "Sports",
    "Education",
    "Technology",
    "Comedy",
    "Lifestyle",
    "Travel",
    "Food",
    "Fashion",
    "Art",
    "Dance",
    "Other",
  ]

  const popularTags = [
    "#viral",
    "#trending",
    "#fyp",
    "#shorts",
    "#funny",
    "#amazing",
    "#tutorial",
    "#tips",
    "#diy",
    "#music",
    "#dance",
    "#comedy",
  ]

  const handleAddTag = () => {
    if (newTag.trim() && !videoData.tags.includes(newTag.trim())) {
      const tag = newTag.trim().startsWith("#") ? newTag.trim() : `#${newTag.trim()}`
      onUpdate({
        ...videoData,
        tags: [...videoData.tags, tag],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdate({
      ...videoData,
      tags: videoData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="h-full flex">
      {/* Video Preview */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative bg-black rounded-2xl overflow-hidden aspect-[9/16] max-h-[440px]">
          {videoFile && (
            <video src={videoFile.url} className="w-full h-full object-cover" poster={videoData.thumbnail} controls />
          )}
        </div>
      </div>

      {/* Details Form */}
      <div className="w-96 border-l border-gray-800 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              value={videoData.title}
              onChange={(e) => onUpdate({ ...videoData, title: e.target.value })}
              placeholder="Give your video a catchy title..."
              maxLength={100}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <div className="text-xs text-gray-400 mt-1">{videoData.title.length}/100 characters</div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={videoData.description}
              onChange={(e) => onUpdate({ ...videoData, description: e.target.value })}
              placeholder="Tell viewers about your video..."
              maxLength={500}
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
            />
            <div className="text-xs text-gray-400 mt-1">{videoData.description.length}/500 characters</div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
            <select
              value={videoData.category}
              onChange={(e) => onUpdate({ ...videoData, category: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>

            {/* Popular Tags */}
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-2">Popular tags:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (!videoData.tags.includes(tag)) {
                        onUpdate({ ...videoData, tags: [...videoData.tags, tag] })
                      }
                    }}
                    className="text-xs bg-gray-700 hover:bg-purple-600 text-gray-300 hover:text-white px-2 py-1 rounded transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Tag Input */}
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddTag}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Hash className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Tags */}
            {videoData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {videoData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-sm flex items-center space-x-1"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-purple-400 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Visibility</label>
            <div className="space-y-2">
              {[
                { value: "public", label: "Public", icon: Globe, desc: "Anyone can search for and view" },
                { value: "unlisted", label: "Unlisted", icon: EyeOff, desc: "Anyone with the link can view" },
                { value: "private", label: "Private", icon: Lock, desc: "Only you can view" },
              ].map((option) => {
                const IconComponent = option.icon
                return (
                  <label
                    key={option.value}
                    className={`
                      flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors
                      ${videoData.visibility === option.value ? "border-purple-500 bg-purple-500/10" : "border-gray-700 hover:border-gray-600"}
                    `}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={videoData.visibility === option.value}
                      onChange={(e) => onUpdate({ ...videoData, visibility: e.target.value as "public" | "private" | "unlisted" })}
                      className="mt-1"
                    />
                    <IconComponent className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Additional Settings</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={videoData.allowComments}
                  onChange={(e) => onUpdate({ ...videoData, allowComments: e.target.checked })}
                  className="rounded"
                />
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span className="text-white">Allow comments</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={videoData.allowDownload}
                  onChange={(e) => onUpdate({ ...videoData, allowDownload: e.target.checked })}
                  className="rounded"
                />
                <Download className="w-4 h-4 text-gray-400" />
                <span className="text-white">Allow download</span>
              </label>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={showSchedule}
                onChange={(e) => setShowSchedule(e.target.checked)}
                className="rounded"
              />
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-white">Schedule for later</span>
            </label>

            {showSchedule && (
              <input
                type="datetime-local"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                onChange={(e) =>
                  onUpdate({
                    ...videoData,
                    scheduledDate: e.target.value ? new Date(e.target.value) : undefined,
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
