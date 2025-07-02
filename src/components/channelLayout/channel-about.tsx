"use client"

import { Calendar, ExternalLink, Mail, Users, TrendingUp, Award } from "lucide-react"

interface ChannelData {
  displayName: string
  bio: string
  followers: number
  following: number
  totalViews: number
  totalVideos: number
  joinDate: string
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string
  }
}

interface ChannelAboutProps {
  channelData: ChannelData
  isOwnChannel: boolean
}

export function ChannelAbout({ channelData, isOwnChannel }: ChannelAboutProps) {
  const stats = [
    {
      label: "Total Views",
      value: channelData.totalViews.toLocaleString(),
      icon: TrendingUp,
    },
    {
      label: "Followers",
      value: channelData.followers.toLocaleString(),
      icon: Users,
    },
    {
      label: "Videos",
      value: channelData.totalVideos.toString(),
      icon: Award,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">About {channelData.displayName}</h3>
        <p className="text-gray-300 leading-relaxed">{channelData.bio}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className="bg-gray-900/50 rounded-xl p-6 text-center">
              <IconComponent className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Details */}
      <div className="bg-gray-900/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Details</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300">Joined {channelData.joinDate}</span>
          </div>

          {/* Social Links */}
          {Object.keys(channelData.socialLinks).length > 0 && (
            <div>
              <h4 className="font-medium text-white mb-3">Links</h4>
              <div className="space-y-2">
                {Object.entries(channelData.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact (Own Channel) */}
      {isOwnChannel && (
        <div className="bg-gray-900/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Business Inquiries</h3>
          <div className="flex items-center space-x-3 text-gray-300">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>business@{channelData.displayName.toLowerCase().replace(/\s+/g, "")}.com</span>
          </div>
        </div>
      )}
    </div>
  )
}
