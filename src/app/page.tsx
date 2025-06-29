"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/header"
import VideoCard from "@/components/video-card"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"
gsap.registerPlugin(ScrollTrigger)

const videos = [
  {
    id: 1,
    title: "Amazing Dance Moves",
    creator: "DanceQueen",
    views: "2.1M",
    likes: "45K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:15",
  },
  {
    id: 2,
    title: "Cooking Hack",
    creator: "ChefMaster",
    views: "890K",
    likes: "23K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:30",
  },
  {
    id: 3,
    title: "Pet Funny Moments",
    creator: "PetLover",
    views: "1.5M",
    likes: "67K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:22",
  },
  {
    id: 4,
    title: "Travel Vlog",
    creator: "Wanderer",
    views: "3.2M",
    likes: "89K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:45",
  },
  {
    id: 5,
    title: "Tech Review",
    creator: "TechGuru",
    views: "756K",
    likes: "34K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:38",
  },
  {
    id: 6,
    title: "Fashion Tips",
    creator: "StyleIcon",
    views: "1.8M",
    likes: "56K",
    thumbnail: "/placeholder.svg?height=400&width=300",
    duration: "0:28",
  },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate video cards on scroll
      gsap.fromTo(
        ".video-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: videoGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Floating animation for hero elements
      gsap.to(".floating", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
          <p className="text-gray-400">Discover the most popular short videos</p>
        </div>

        <div ref={videoGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            Load More Videos
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
