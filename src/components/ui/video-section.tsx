'use client';

import { useRef, useEffect } from 'react';
import type { TikTokVideo } from '@/types/video-types';

interface VideoSectionProps {
  video: TikTokVideo | null;
  isMuted: boolean;
  isPlaying: boolean;
  setIsMuted: (isMuted: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export default function VideoSection({ video, isMuted, isPlaying }: VideoSectionProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoElementRef.current) {
      if (isPlaying) {
        videoElementRef.current.play().catch((error) => {
          console.error('Video playback failed:', error);
        });
      } else {
        videoElementRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
      <video
        ref={videoElementRef}
        className="w-full h-full object-contain"
        src={video?.videoMeta?.downloadAddr || '/placeholder.mp4'}
        loop
        muted={!isMuted}
        playsInline
        poster={video?.videoMeta?.coverUrl || '/placeholder.svg?height=720&width=1280'}
      />
    </div>
  );
}