"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Play, TrendingUp, Users, Video } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" })
        .fromTo(
          ".hero-subtitle",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero-buttons",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.2",
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])
  const handleNavigate = (href: string) => () => {
    if (href) {
      router.push(href)
    }
  }
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

      {/*background elements decoration*/}
      <div className="absolute inset-0">
        <div className="floating absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
        <div className="floating absolute top-40 right-20 w-32 h-32 bg-pink-500/10 rounded-full blur-xl" />
        <div className="floating absolute bottom-20 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Create. Share. Inspire.
          </span>
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join millions of creators sharing their stories through short, engaging videos. Discover trending content and
          build your community.
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href={"/explore"} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            Start Watching
          </Link>
          <button onClick={handleNavigate("/upload")} className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <Video className="w-5 h-5" />
            Upload Video
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="hero-stats bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">10M+</div>
            <div className="text-gray-400">Active Users</div>
          </div>

          <div className="hero-stats bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-pink-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50M+</div>
            <div className="text-gray-400">Videos Shared</div>
          </div>

          <div className="hero-stats bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1B+</div>
            <div className="text-gray-400">Views Daily</div>
          </div>
        </div>
      </div>
    </section>
  )
}
