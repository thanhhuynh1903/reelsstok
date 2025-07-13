"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/header"
import VideoCard from "@/components/video-card"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"
import { useDispatch, useSelector } from "react-redux"
import { fetchVideos } from "./redux/actions/VideoloadAction"
import type { RootState, AppDispatch } from "./store"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoGridRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  const { videos, status } = useSelector((state: RootState) => state.videos)

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

    if (status === 'idle') {
      dispatch(fetchVideos())
    }

    return () => ctx.revert()

  }, [dispatch, status])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-4 py-12">
        {status === "failed" && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-400">Discover the most popular short videos</p>
          </div>)}
        {status === "loading" && (
          <div className="text-center py-16 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            Loading videos...
          </div>
        )}
        {status === "succeeded" && (
          <>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-400">Discover the most popular short videos</p>
          </div>
          <div ref={videoGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div key={video.id}>
              <VideoCard video={video} />
              </div>
            ))}
          </div>
          </>
        )}
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
