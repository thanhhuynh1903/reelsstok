"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoFile {
  file: File
  url: string
  duration: number
  thumbnail: string
  size: number
}

interface VideoPreviewProps {
  videoFile: VideoFile
}

export function VideoPreview({ videoFile }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    const video = videoRef.current
    if (!video) return

    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Player */}
        <div className="space-y-2">
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-[9/16] max-h-[440px] mx-auto">
            <video ref={videoRef} src={videoFile.url} className="w-full h-full object-cover" onClick={togglePlay} />

            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
              <button
                onClick={togglePlay}
                className="bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-black/70 transition-colors"
              >
                {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
              </button>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max={videoFile.duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button onClick={togglePlay} className="text-white hover:text-purple-400 transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <div className="flex items-center space-x-2">
                    <button onClick={toggleMute} className="text-white hover:text-purple-400 transition-colors">
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(videoFile.duration)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="space-y-6 overflow-y-auto max-h-[440px]">
          <div>
            <h3 className="text-xl font-bold text-white my-2">Video Information</h3>
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">File Name:</span>
                    <p className="text-white font-medium truncate">{videoFile.file.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">File Size:</span>
                    <p className="text-white font-medium">{formatFileSize(videoFile.size)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span>
                    <p className="text-white font-medium">{formatTime(videoFile.duration)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Format:</span>
                    <p className="text-white font-medium">{videoFile.file.type}</p>
                  </div>
                </div>
              </div>

              {/* Video Analysis */}
              <div className="bg-gray-900/50 rounded-xl p-4">
                <h4 className="font-medium text-white mb-3">Video Analysis</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Aspect Ratio</span>
                    <span className="text-green-400">9:16 ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className={videoFile.duration <= 60 ? "text-green-400" : "text-yellow-400"}>
                      {videoFile.duration <= 60 ? "Perfect ✓" : "Long ⚠"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">File Size</span>
                    <span className="text-green-400">Optimized ✓</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-purple-600/10 border border-purple-600/20 rounded-xl p-4">
                <h4 className="font-medium text-purple-400 mb-3">💡 Optimization Tips</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Your video is perfectly formatted for shorts!</li>
                  <li>• Consider adding captions for better accessibility</li>
                  <li>• Make sure the first 3 seconds are engaging</li>
                  <li>• Use trending hashtags to increase visibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
