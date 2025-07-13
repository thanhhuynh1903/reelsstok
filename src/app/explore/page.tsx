"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import VideoCard from "@/components/video-card"
import { Search, Grid, List, TrendingUp, Plus } from "lucide-react"
import { UseQueryNoToken } from "@/lib/Query/QueryClient"
import type { TikTokVideo } from "@/types/video-types"
gsap.registerPlugin(ScrollTrigger)

export default function VideosPage() {
    const { data, isLoading } = UseQueryNoToken({
        queryKey: ['explore'],
        endpoint: `${process.env.NEXT_PUBLIC_API_URL_APIFY_TRENDING}`,
        enabled: true,
    });

    // Memoize videos to prevent recalculations on every render
    const videos = useMemo(() => {
        return Array.isArray(data)
            ? (data.filter((video) => video.id) as TikTokVideo[])
            : [];
    }, [data]);

    const [filteredVideos, setFilteredVideos] = useState<TikTokVideo[]>(videos); // Initialize with videos

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [sortBy, setSortBy] = useState("trending")
    const [searchQuery, setSearchQuery] = useState("")

    const containerRef = useRef<HTMLDivElement>(null)
    const videoGridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Only animate if there are videos to show
            if (filteredVideos.length > 0) {
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
                        stagger: 0.05,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: videoGridRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse",
                        },
                    },
                )
            }

            gsap.fromTo(".page-header", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
        }, containerRef)

        return () => ctx.revert()
    }, [filteredVideos,videos])

    useEffect(() => {
        let filtered: TikTokVideo[] = [...videos]  // Start with the latest videos

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(
                (video) =>
                    video.text.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // // Sort videos
        // switch (sortBy) {
        //     case "trending":
        //         filtered = filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        //         break
        //     case "recent":
        //         filtered = filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        //         break
        //     case "views":
        //         filtered = filtered.sort((a, b) => {
        //             const parseViews = (views: string) => {
        //                 if (views.includes('M')) return parseFloat(views) * 1000000;
        //                 if (views.includes('K')) return parseFloat(views) * 1000;
        //                 return parseFloat(views);
        //             };
        //             return parseViews(b.views) - parseViews(a.views);
        //         })
        //         break
        // }

        setFilteredVideos(filtered)
    }, [sortBy, searchQuery, videos])  // Added videos to dependencies

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white">
            <div className="p-6">
                {/* Page Header */}
                <div className="page-header flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Discover Videos</h1>
                        <p className="text-gray-400">Explore {filteredVideos.length} amazing videos from creators worldwide</p>
                    </div>

                    {/* Search and Controls */}
                    <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                        {/* Search */}
                        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                            <Plus />
                        </button>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search videos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-2 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors w-full md:w-64"
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
                        >
                            <option value="trending">🔥 Trending</option>
                            <option value="recent">🕒 Recent</option>
                            <option value="views">👁️ Most Viewed</option>
                        </select>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-800/50 rounded-xl p-1 border border-gray-700">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Videos Grid/List */}
                <div ref={videoGridRef}>
                    {isLoading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold">Loading videos...</h3>
                        </div>
                    ) : filteredVideos.length > 0 ? (
                        <div
                            className={
                                viewMode === "grid"
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                                    : "space-y-4"
                            }
                        >
                            {filteredVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className={viewMode === "list" ? "flex space-x-4 bg-gray-900/50 rounded-xl p-4" : ""}
                                >
                                    <VideoCard video={video} />
                                    {viewMode === "list" && (
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                {video.trending && (
                                                    <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded flex items-center">
                                                        <TrendingUp className="w-3 h-3 mr-1" />
                                                        Trending
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-300 text-sm">
                                                Uploaded {new Date(video.createTimeISO.split("T")[0]).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                            <p className="text-gray-400 mb-4">Try adjusting your search criteria</p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl transition-colors"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* Load More */}
                {filteredVideos.length > 0 && (
                    <div className="text-center py-8">
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                            Load More Videos
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}