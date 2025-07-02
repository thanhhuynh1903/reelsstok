"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChannelHeader } from "./channel-header"
import { ChannelTabs } from "./channel-tabs"
import { ChannelContent } from "./channel-content"
import { ChannelSidebar } from "./channel-sidebar"

gsap.registerPlugin(ScrollTrigger)

interface ChannelData {
  id: string
  username: string
  displayName: string
  avatar: string
  banner: string
  bio: string
  followers: number
  following: number
  totalViews: number
  totalVideos: number
  joinDate: string
  isVerified: boolean
  isLive: boolean
  badges: string[]
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    website?: string
  }
}

interface ChannelLayoutProps {
  channelData: ChannelData
  isOwnChannel?: boolean
  className?: string
}

export function ChannelLayout({ channelData, isOwnChannel = false, className = "" }: ChannelLayoutProps) {
  const [activeTab, setActiveTab] = useState("shorts")
  const [isFollowing, setIsFollowing] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  const layoutRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate layout entrance
      gsap.fromTo(layoutRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

      // Parallax effect for banner
      gsap.to(".channel-banner", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Sticky header animation
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "bottom top",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(".channel-nav", {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          }
        },
      })
    }, layoutRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={layoutRef} className={`min-h-screen bg-black text-white ${className}`}>
      {/* Channel Header */}
      <div ref={headerRef}>
        <ChannelHeader
          channelData={channelData}
          isOwnChannel={isOwnChannel}
          isFollowing={isFollowing}
          onFollowToggle={() => setIsFollowing(!isFollowing)}
        />
      </div>

      {/* Sticky Navigation */}
      <div className="channel-nav sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-b border-gray-800">
        <div className="container mx-auto px-4">
          <ChannelTabs activeTab={activeTab} onTabChange={setActiveTab} channelData={channelData} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <ChannelContent activeTab={activeTab} channelData={channelData} isOwnChannel={isOwnChannel} />
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="w-80 flex-shrink-0 hidden lg:block">
              <ChannelSidebar channelData={channelData} onClose={() => setShowSidebar(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
