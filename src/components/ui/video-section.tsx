import React from 'react'
import type { TikTokVideo } from '@/types/video-types';

interface VideoSectionProps {
  video: TikTokVideo | null;
  isMuted?: boolean;
  setIsMuted: (isMuted: boolean) => void;
}
export default function VideoSection({ video, isMuted = false, setIsMuted }: VideoSectionProps) {  
  return (
    <div onClick={() => setIsMuted(!isMuted)} className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
      <video
        className="w-full h-full object-cover"
        src={video?.videoMeta.downloadAddr || '/placeholder.mp4'}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster={video?.videoMeta.coverUrl || '/placeholder.svg?height=720&width=1280'}
      />
    </div>

  )
}
