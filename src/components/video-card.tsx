"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Heart, Share, MessageCircle, MoreVertical } from "lucide-react"
import { gsap } from "gsap"
import type { VideoCardProps } from "@/types/video-typs"
import Link from "next/link"
import ValidationCountButton from "@/utils/ValidationCountButton"
import { removeTrailingHashtags } from "@/utils/removeTrailingHashtags"
export default function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isHovered) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.2,
        })
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
        })
      }
    }, cardRef)

    return () => ctx.revert()
  }, [isHovered])

  const handleLike = () => {
    setIsLiked(!isLiked)
    gsap.fromTo(
      cardRef.current?.querySelector(".like-icon") as SVGElement,
      { scale: 1 },
      { scale: 1.3, duration: 0.1, yoyo: true, repeat: 1 },
    )
  }

  return (
    <div
      ref={cardRef}
      className="video-card relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/home`} className="block h-full">
        {/* Thumbnail */}
        <div className="relative aspect-[3/4]">
          <video
            className="w-full h-full object-cover"
            src={video?.videoMeta?.downloadAddr || '/placeholder.mp4'}
            loop
            playsInline
            poster={video?.videoMeta?.coverUrl || '/placeholder.svg?height=720&width=1280'}
          />
          {/* Duration badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            {video.duration}
          </div>

          {/* Play overlay */}
          <div ref={overlayRef} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 h-[50px] overflow-hidden">{removeTrailingHashtags(video.text)}</h3>
          <p className="text-gray-400 text-sm mb-3">@{video?.authorMeta?.nickName}</p>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{ValidationCountButton({ num: video.playCount })} views</span>
            <div className="flex items-center space-x-3">
              <button onClick={handleLike} className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                <Heart className={`like-icon w-4 h-4 ${isLiked ? "fill-red-400 text-red-400" : ""}`} />
                <span>{ValidationCountButton({ num: video?.diggCount })}</span>
              </button>
              <button className="hover:text-white transition-colors">
                <Share className="w-4 h-4" />
              </button>
              <button className="hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hover actions */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors">
            <MessageCircle className="w-4 h-4 text-white" />
          </button>
        </div>
      </Link>
    </div>
  )
}
