import React from 'react'
import { VolumeX, Volume2, MoreHorizontal, X, Play, Pause } from 'lucide-react'
import Link from 'next/link'
export default function VideoOverLayout({ isMuted = true, isLive = true, channelName = "Channel Name", videoTitle = "Video Title", viewCount = 1234, isPlaying = false }) {
    return (
        <div> {/* Video Overlay UI */}
            <div className="absolute inset-0 bg-black/20">
                {/* Top Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => !isMuted}
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        {isLive && (
                            <div className="bg-red-600 rounded-full px-3 py-1 text-sm font-medium flex items-center">
                                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                                LIVE
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                        <button
                            className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Center Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        className="p-4 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all transform hover:scale-110"
                    >
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </button>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                        <Link href="/channels/buildmaster" className='flex flex-row items-center space-y-2 space-x-4'>
                            <div className="relative">
                                <img
                                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFdupUSSbQ3Zx2H3xcvQfH1UfcdYLjCL2a7Q&s"}
                                    className="w-16 h-16 object-cover md:w-18 md:h-18 rounded-full border-4 border-black bg-gray-900"
                                />
                            </div>
                            <div  className="flex-1">
                                <h3 className="font-semibold text-xl">{channelName}</h3>
                                <h2 className="font-bold text-sm mb-2">{videoTitle}</h2>
                                <div className="flex items-center space-x-4 text-sm text-gray-300">
                                    <span>{viewCount} viewers</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1">
                                        <span className="text-green-400">●</span>
                                        <span>Live now</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {["#minecraft", "#building", "#tutorial", "#gaming", "#live"].map((tag) => (
                                <span key={tag} className="bg-purple-600/30 text-purple-300 px-2 py-1 rounded-full text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
