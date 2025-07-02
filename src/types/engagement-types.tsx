export interface EngagementButtonProps {
  isLiked?: boolean
  isSaved?: boolean
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