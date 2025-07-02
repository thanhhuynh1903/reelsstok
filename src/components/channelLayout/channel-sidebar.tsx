"use client"

import { useState } from "react"
import { X, TrendingUp, Clock, Users, ExternalLink } from "lucide-react"

interface ChannelData {
  displayName: string
  totalViews: number
  totalVideos: number
  followers: number
  joinDate: string
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string
  }
}

interface ChannelSidebarProps {
  channelData: ChannelData
  onClose: () => void
}

export function ChannelSidebar({ channelData, onClose }: ChannelSidebarProps) {
  const [activeSection, setActiveSection] = useState("stats")

  const stats = [
    {
      label: "Total Views",
      value: channelData.totalViews.toLocaleString(),
      icon: TrendingUp,
      color: "text-purple-400",
    },
    {
      label: "Videos",
      value: channelData.totalVideos.toString(),
      icon: Clock,
      color: "text-blue-400",
    },
    {
      label: "Followers",
      value: channelData.followers.toLocaleString(),
      icon: Users,
      color: "text-green-400",
    },
  ]

  const achievements = [
    {
      title: "Content Creator",
      description: "Uploaded 100+ videos",
      icon: "🎬",
      earned: "2023",
    },
    {
      title: "Community Builder",
      description: "Reached 10K followers",
      icon: "👥",
      earned: "2023",
    },
    {
      title: "Viral Video",
      description: "Video reached 1M+ views",
      icon: "🔥",
      earned: "2024",
    },
    {
      title: "Consistent Creator",
      description: "Posted weekly for 6 months",
      icon: "⭐",
      earned: "2024",
    },
  ]

  const recentActivity = [
    {
      type: "video",
      title: "Uploaded new video",
      description: "Epic Minecraft Castle Build",
      time: "2 hours ago",
    },
    {
      type: "milestone",
      title: "Reached 50K followers",
      description: "Thank you for the support!",
      time: "1 day ago",
    },
    {
      type: "community",
      title: "Posted community update",
      description: "New series coming soon",
      time: "3 days ago",
    },
  ]

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="font-semibold">Channel Info</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {[
          { id: "stats", label: "Stats" },
          { id: "achievements", label: "Awards" },
          { id: "activity", label: "Activity" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeSection === tab.id
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeSection === "stats" && (
          <div className="space-y-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className="font-semibold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              )
            })}

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-medium text-white mb-3">Connect</h4>
              <div className="space-y-2">
                {Object.entries(channelData.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "achievements" && (
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-white">{achievement.title}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                  <div className="text-xs text-purple-400 mt-1">Earned {achievement.earned}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "activity" && (
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div
                  className={`
                  w-2 h-2 rounded-full mt-2 flex-shrink-0
                  ${
                    activity.type === "video"
                      ? "bg-purple-400"
                      : activity.type === "milestone"
                        ? "bg-green-400"
                        : "bg-blue-400"
                  }
                `}
                />
                <div className="flex-1">
                  <div className="font-medium text-white">{activity.title}</div>
                  <div className="text-sm text-gray-400">{activity.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
