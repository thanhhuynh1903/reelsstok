import React from 'react'

export default function VideoSection({isMuted = true}) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
      <video
        className="w-full h-full object-cover"
        src="/placeholder.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/placeholder.svg?height=720&width=1280"
      />
    </div>

  )
}
