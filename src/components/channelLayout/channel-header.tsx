"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"
import {
    UserPlus,
    UserCheck,
    Bell,
    BellRing,
    Share,
    MoreHorizontal,
    Calendar,
    ExternalLink,
    Edit,
    Settings,
    Radio,
} from "lucide-react"
import { EditProfileModal } from "../ui/EditModal"
import type { ProfileData } from "@/types/profile-types"
interface ChannelData {
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

interface ChannelHeaderProps {
    channelData: ChannelData
    isOwnChannel: boolean
    isFollowing: boolean
    onFollowToggle: () => void
}

export function ChannelHeader({ channelData, isOwnChannel, isFollowing, onFollowToggle }: ChannelHeaderProps) {
    const [showFullBio, setShowFullBio] = useState(false)
    const [notificationsOn, setNotificationsOn] = useState(false)
    const [showShareMenu, setShowShareMenu] = useState(false)
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [profileData, setProfileData] = useState({
        displayName: channelData.displayName,
        username: channelData.username,
        bio: channelData.bio,
        avatar: channelData.avatar,
        banner: channelData.banner,
        location: "", // Add location if needed
        website: "", // Add website if needed
        socialLinks: channelData.socialLinks,
    })

    const handleSave = (updatedData: ProfileData) => {
        setProfileData(updatedData)
        setIsModalOpen(false)
    }
    const handleNavigate = () => {
        router.push(`/profile/edit/`)
    }

    const followButtonRef = useRef<HTMLButtonElement>(null)
    const bellButtonRef = useRef<HTMLButtonElement>(null)

    const handleFollow = () => {
        onFollowToggle()
        gsap.fromTo(followButtonRef.current, { scale: 1 }, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 })
    }

    const handleNotificationToggle = () => {
        setNotificationsOn(!notificationsOn)
        gsap.fromTo(
            bellButtonRef.current,
            { scale: 1, rotation: 0 },
            { scale: 1.2, rotation: 15, duration: 0.2, yoyo: true, repeat: 1 },
        )
    }

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`
        }
        return num.toString()
    }

    return (
        <div className="relative">
            {/* Banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <div className="channel-banner absolute inset-0">
                    <img
                        src={channelData.banner || "/placeholder.svg?height=320&width=1200"}
                        alt={`${channelData.displayName} banner`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Edit Banner Button (Own Channel) */}
                {isOwnChannel && (
                    <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 p-2 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Profile Section */}
            <div className="relative -mt-20 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        {/* Avatar */}
                        <div className="relative">
                            <img
                                src={channelData.avatar || "/placeholder.svg?height=120&width=120"}
                                alt={channelData.displayName}
                                className="w-24 h-24 object-cover md:w-32 md:h-32 rounded-full border-4 border-black bg-gray-900"
                            />

                            {channelData.isLive && (
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-red-600 rounded-full border-4 border-black flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                </div>
                            )}
                            {isOwnChannel && (
                                <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 p-2 rounded-full transition-colors">
                                    <Edit className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 space-y-3">
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <h1 className="text-2xl md:text-4xl font-bold">{channelData.displayName}</h1>
                                    {channelData.isVerified && (
                                        <div className="bg-blue-600 rounded-full p-1">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                    {channelData.badges.map((badge, index) => (
                                        <span key={index} className="text-lg">
                                            {badge}
                                        </span>
                                    ))}
                                    {/* Live Indicator */}
                                    {channelData.isLive && (
                                        <div className="">
                                            <div className="bg-red-600 rounded-full px-4 py-2 flex items-center space-x-2">
                                                <Radio className="w-4 h-4" />
                                                <span className="font-normal text-[12px]">LIVE</span>
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-400">@{channelData.username}</p>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center space-x-1">
                                    <span className="font-semibold text-white">{formatNumber(channelData.followers)}</span>
                                    <span className="text-gray-400">followers</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className="font-semibold text-white">{formatNumber(channelData.following)}</span>
                                    <span className="text-gray-400">following</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className="font-semibold text-white">{formatNumber(channelData.totalViews)}</span>
                                    <span className="text-gray-400">total views</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className="font-semibold text-white">{channelData.totalVideos}</span>
                                    <span className="text-gray-400">videos</span>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="max-w-2xl">
                                <p className={`text-gray-300 ${showFullBio ? "" : "line-clamp-2"}`}>{channelData.bio}</p>
                                {channelData.bio.length > 150 && (
                                    <button
                                        onClick={() => setShowFullBio(!showFullBio)}
                                        className="text-purple-400 hover:text-purple-300 text-sm mt-1"
                                    >
                                        {showFullBio ? "Show less" : "Show more"}
                                    </button>
                                )}
                            </div>

                            {/* Join Date & Social Links */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {channelData.joinDate}</span>
                                </div>
                                {Object.entries(channelData.socialLinks).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-1 hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span className="capitalize">{platform}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-3">
                            {isOwnChannel ? (
                                <>
                                    <button onClick={() => setIsModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2">
                                        <Edit className="w-4 h-4" />
                                        <span>Edit Profile</span>
                                    </button>
                                    <EditProfileModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        profileData={profileData}
                                        onSave={handleSave}
                                    />
                                    <button onClick={handleNavigate} className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        ref={followButtonRef}
                                        onClick={handleFollow}
                                        className={`
                      px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2
                      ${isFollowing
                                                ? "bg-gray-800 hover:bg-gray-700 text-white"
                                                : "bg-purple-600 hover:bg-purple-700 text-white"
                                            }
                    `}
                                    >
                                        {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                                        <span>{isFollowing ? "Following" : "Follow"}</span>
                                    </button>

                                    {isFollowing && (
                                        <button
                                            ref={bellButtonRef}
                                            onClick={handleNotificationToggle}
                                            className={`
                        p-2 rounded-full transition-colors
                        ${notificationsOn ? "bg-purple-600 text-white" : "bg-gray-800 hover:bg-gray-700"}
                      `}
                                        >
                                            {notificationsOn ? <BellRing className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                                        </button>
                                    )}

                                    <div className="relative">
                                        <button
                                            onClick={() => setShowShareMenu(!showShareMenu)}
                                            className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
                                        >
                                            <Share className="w-5 h-5" />
                                        </button>

                                        {showShareMenu && (
                                            <div className="absolute right-0 top-12 bg-gray-900 rounded-lg shadow-lg py-2 z-20 min-w-48">
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors">
                                                    Copy Link
                                                </button>
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors">
                                                    Share to Twitter
                                                </button>
                                                <button className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors">
                                                    Share to Facebook
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
