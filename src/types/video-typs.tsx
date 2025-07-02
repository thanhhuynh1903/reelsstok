interface Video {
  id: number
  title: string
  creator: string
  views: string
  likes: string
  thumbnail: string
  duration: string
}

export interface VideoCardProps {
  video: Video
}

export interface GamingVideoPlayerProps {
  videoTitle?: string
  channelName?: string
  viewCount?: string
  isLive?: boolean
}