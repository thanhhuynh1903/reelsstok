"use client"

import { Grid, Bookmark, Users, Info, Radio } from "lucide-react"

interface ChannelData {
  totalVideos: number
  isLive: boolean
}

interface ChannelTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  channelData: ChannelData
}

export function ChannelTabs({ activeTab, onTabChange, channelData }: ChannelTabsProps) {
  const tabs = [
    {
      id: "shorts",
      label: "Shorts",
      icon: Grid,
      count: 45,
    },
    {
      id: "live",
      label: "Live",
      icon: Radio,
      count: channelData.isLive ? 1 : 0,
      badge: channelData.isLive ? "LIVE" : null,
    },
    {
      id: "playlists",
      label: "Playlists",
      icon: Bookmark,
      count: 12,
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      count: 28,
    },
    {
      id: "about",
      label: "About",
      icon: Info,
    },
  ]

  return (
    <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-4">
      {tabs.map((tab) => {
        const IconComponent = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap
              ${isActive ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}
            `}
          >
            <IconComponent className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`
                text-xs px-2 py-0.5 rounded-full
                ${isActive ? "bg-purple-700" : "bg-gray-700"}
              `}
              >
                {tab.count}
              </span>
            )}
            {tab.badge && (
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">{tab.badge}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
