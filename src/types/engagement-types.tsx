import type { TikTokVideo } from "./video-types"
export interface EngagementButtonProps {
  data: TikTokVideo,
  isLiked?: boolean
  isSaved?: boolean
  isLive?: boolean
  handleLike: () => void
  handleSave: () => void
}

export interface EngagementButton {
  name: string
  icon: React.ReactNode
  count: string
  isActive: boolean
  onClick: () => void
  activeClass: React.ReactNode
}