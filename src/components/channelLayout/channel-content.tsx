"use client"
import { ChannelVideos } from "./channel-videos"
import { ChannelAbout } from "./channel-about"

interface ChannelData {
  id: string
  username: string
  displayName: string
  bio: string
  followers: number
  following: number
  totalViews: number
  totalVideos: number
  joinDate: string
  isVerified: boolean
  isLive: boolean
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string
  }
}

interface ChannelContentProps {
  activeTab: string
  channelData: ChannelData
  isOwnChannel: boolean
}

export function ChannelContent({ activeTab, channelData, isOwnChannel }: ChannelContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "videos":
        return <ChannelVideos channelData={channelData} isOwnChannel={isOwnChannel} />
      case "about":
        return <ChannelAbout channelData={channelData} isOwnChannel={isOwnChannel} />
      default:
        return <ChannelVideos channelData={channelData} isOwnChannel={isOwnChannel} />
    }
  }

  return <div className="space-y-6">{renderContent()}</div>
}
