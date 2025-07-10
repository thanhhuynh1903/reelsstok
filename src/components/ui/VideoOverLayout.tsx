import React from 'react'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { VolumeX, Volume2, MoreHorizontal, X, Play, Pause, UserPlus, ArrowDownUp } from 'lucide-react'
import Link from 'next/link'
import type { TikTokVideo } from '@/types/video-types'
interface VideoOverLayoutProps {
    data: TikTokVideo | null;
    isMuted?: boolean;
    isLive?: boolean;
    isPlaying?: boolean;
}
export default function VideoOverLayout({
    data,
    isMuted = true,
    isLive = true,
    isPlaying = false,
}: VideoOverLayoutProps) {
    const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false)
    const descRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (descRef.current) {
            // Get natural height of content
            const contentHeight = descRef.current.scrollHeight;
            gsap.fromTo(descRef.current,
                { height: 80 },
                { height: contentHeight, duration: 0.4, ease: "power2.out" }
            )
        }
    }, [isOpenDescription])
    const channelName = data?.authorMeta.nickName || 'Channel Name';
    const videoTitle = data?.text || 'Video Title';
    const viewCount = data?.playCount || 1234;
    const imageURL = data?.authorMeta.originalAvatarUrl
    const hastag = data?.hashtags
    return (
        <div className="absolute inset-0 bg-black/10">
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

            {/* Bottom Info - Single container with animated height */}
            <div
                ref={descRef}
                className="absolute bottom-5 left-4 right-4 overflow-hidden"
                style={{ height: isOpenDescription ? 80 : 'auto' }}
            >
                <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                    {!isOpenDescription ? (
                        // Expanded state content
                        <div className='flex flex-row items-start space-x-4'>
                            <Link href="/channels/buildmaster" className="relative">
                                <img
                                    src={imageURL}
                                    className="w-16 h-16 object-cover md:w-18 md:h-18 rounded-full border-4 border-black bg-gray-900"
                                />
                            </Link>
                            <div className="flex-1">
                                <div className='flex justify-between items-start'>
                                    <div className='flex items-center'>
                                        <Link href="/channels/buildmaster" className="text-white">
                                            <h3 className="font-semibold text-xl">{channelName}</h3>
                                        </Link>
                                        <button className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                                            <UserPlus className="w-4 h-4 inline-block mr-1" />
                                            <span className='text-sm'>Follow</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setIsOpenDescription(!isOpenDescription)}
                                        className="bg-black/50 backdrop-blur-sm rounded-[10px] p-2 hover:bg-black/70 transition-colors"
                                    >
                                        <ArrowDownUp className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                                    </button>
                                </div>
                                <h2 className="font-bold text-sm mb-2">{videoTitle}</h2>
                                {isLive && (
                                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                                        <span>{viewCount} viewers</span>
                                        <span>•</span>
                                        <span className="flex items-center space-x-1">
                                            <span className="text-green-400">●</span>
                                            <span>Live now</span>
                                        </span>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {hastag && hastag.map((tag) => (
                                        <span className="bg-purple-600/30 text-purple-300 px-2 py-1 rounded-full text-xs">
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Minimized state content
                        <div className='flex flex-row items-center'>
                            <Link href="/channels/buildmaster" className="relative flex items-center justify-center mr-2">
                                <img
                                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFdupUSSbQ3Zx2H3xcvQfH1UfcdYLjCL2a7Q&s"}
                                    className="w-8 h-8 object-cover md:w-10 md:h-10 rounded-full border-4 border-black bg-gray-900"
                                />
                            </Link>
                            <div className="flex-1">
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <Link href="/channels/buildmaster" className="text-white">
                                            <h3 className="font-semibold text-lg">{channelName}</h3>
                                        </Link>
                                        {isLive && (
                                            <div className="flex items-center text-sm text-gray-300 ml-4">
                                                <span>{viewCount} viewers</span>
                                                <span className="mx-1">•</span>
                                                <div className="flex items-center">
                                                    <span className="text-green-400 mr-1">●</span>
                                                    <span>Live now</span>
                                                </div>
                                            </div>
                                        )}
                                        <button className="ml-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                                            <UserPlus className="w-4 h-4 inline-block mr-1" />
                                            <span className='text-sm'>Follow</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setIsOpenDescription(!isOpenDescription)}
                                        className="bg-black/50 backdrop-blur-sm rounded-[10px] p-2 hover:bg-black/70 transition-colors"
                                    >
                                        <ArrowDownUp className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}