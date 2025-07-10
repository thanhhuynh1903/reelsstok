import React from 'react'
import { Heart, MessageCircle, Bookmark, Share, MessageSquareHeart } from 'lucide-react'
import type { EngagementButtonProps } from '@/types/engagement-types'
import ValidationCountButton from '@/utils/ValidationCountButton'
export default function EngagementButton({ data, isLiked = false, isLive = false, isSaved = false, handleLike, handleSave }: EngagementButtonProps) {
    const objectLivebutton = [{
        name: "Like",
        icon: <Heart className="w-6 h-6" />,
        count: data.playCount,
        isActive: isLiked,
        onClick: handleLike,
        activeClass: <Heart className="w-6 h-6" fill="red" stroke="red" />,
    },
    {
        name: "Comment",
        icon: <MessageSquareHeart className="w-6 h-6" />,
        count: data.commentCount,
        isActive: false,
        onClick: () => { },
        activeClass: <MessageCircle className="w-6 h-6" />,
    },
    {
        name: "Share",
        icon: <Share className="w-6 h-6" />,
        count: "234",
        isActive: data.shareCount,
        onClick: () => { },
        activeClass: <Share className="w-6 h-6" />,
    }]
    const objectVideobutton = [{
        name: "Like",
        icon: <Heart className="w-6 h-6" />,
        count: ValidationCountButton({ num: data?.playCount }),
        isActive: isLiked,
        onClick: handleLike,
        activeClass: <Heart className="w-6 h-6" fill="red" stroke="red" />,
    },
    {
        name: "Comment",
        icon: <MessageCircle className="w-6 h-6" />,
        count: "847",
        isActive: ValidationCountButton({ num: data?.commentCount }),
        onClick: () => { },
        activeClass: <MessageCircle className="w-6 h-6" />,
    },
    {
        name: "Save",
        icon: <Bookmark className="w-6 h-6" />,
        count: ValidationCountButton({ num: data?.collectCount }),
        isActive: isSaved,
        onClick: handleSave,
        activeClass: <Bookmark className="w-6 h-6" fill="yellow" stroke="yellow" />,
    }, {
        name: "Share",
        icon: <Share className="w-6 h-6" />,
        count: ValidationCountButton({ num: data?.shareCount }),
        isActive: false,
        onClick: () => { },
        activeClass: <Share className="w-6 h-6" />,
    }]

    return (
        <div className="absolute right-5 top-[45%] transform -translate-y-1/2 flex flex-col space-y-4">
            {isLive ?
                objectLivebutton.map((button, index) => (
                    <div className='flex flex-col items-center' key={index}>
                        <button
                            onClick={button.onClick}
                            className={`engagement-btn ${button.name === "Like" ? "like-btn" : "save-btn"} p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110
                            }`}
                        >
                            {button.isActive ? button.activeClass : button.icon}
                        </button>
                        <div className="text-center text-sm text-gray-300">{button.count}</div>
                    </div>
                )) :
                objectVideobutton.map((button, index) => (
                    <div className='flex flex-col items-center' key={index}>
                        <button
                            onClick={button.onClick}
                            className={`engagement-btn ${button.name === "Like" ? "like-btn" : "save-btn"} p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110
                            }`}
                        >

                            {button.isActive ? button.activeClass : button.icon}
                        </button>
                        <div className="text-center text-sm text-gray-300">{button.count}</div>
                    </div>

                ))}
        </div>
    )
}
