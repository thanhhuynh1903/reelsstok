export interface CommentLayoutProps {
  key: string | number
  avatar?: string
  username: string
  timestamp: string
  like: number
  message: string
}

export interface Comment {
  id: string
  username: string
  displayName: string
  avatar: string
  message: string
  timestamp: string
  likes: number
}

export interface GamingVideoPlayerProps {
  videoTitle?: string
  channelName?: string
  viewCount?: string
  isLive?: boolean
}