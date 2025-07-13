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
  // const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // const [loadingProgress, setLoadingProgress] = useState(0);

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

  // // Reset loading state when video changes
  // useEffect(() => {
  //   setIsVideoLoaded(false);
  //   setLoadingProgress(0);
  // }, [video]);

  // const handleLoadedData = () => {
  //   setIsVideoLoaded(true);
  // };

  // const handleProgress = () => {
  //   if (videoElementRef.current) {
  //     const buffered = videoElementRef.current.buffered;
  //     if (buffered.length > 0) {
  //       const progress = (buffered.end(buffered.length - 1) / videoElementRef.current.duration * 100);
  //       setLoadingProgress(progress);
  //     }
  //   }
  // };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
      {/* Loading overlay */}
      {/* {!isVideoLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black">
          <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin mb-4" />
          <p className="text-white font-medium">Loading video...</p>
          <div className="w-64 h-1 bg-gray-700 mt-4 rounded-full">
            <div
              className="h-full bg-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )} */}

      <video
        ref={videoElementRef}
        className="w-full h-full object-contain"
        src={video?.videoMeta?.downloadAddr || '/placeholder.mp4'}
        loop
        muted={!isMuted}
        playsInline
        poster={video?.videoMeta?.coverUrl || '/placeholder.svg?height=720&width=1280'}
        // onLoadedData={handleLoadedData}
        // onProgress={handleProgress}
        // onWaiting={() => setIsVideoLoaded(false)}
        // onCanPlay={() => setIsVideoLoaded(true)}
      />
    </div>
  );
}