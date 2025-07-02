import React from 'react'
import { Heart } from 'lucide-react'
import type { CommentLayoutProps } from '@/types/comment-types'
export default function CommentLayout({ key, avatar, username, timestamp, like, message }: CommentLayoutProps) {
    return (
        <div key={key} className="comment-item flex space-x-3 group">
            <img
                src={avatar || "/placeholder.svg"}
                alt={username}
                className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm text-white truncate">{username}</span>
                    <span className="text-xs text-gray-500">{timestamp}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{message}</p>
                <div className="flex items-center space-x-4 mt-2 ">
                    <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-400 transition-colors">
                        <Heart className="w-3 h-3" />
                        <span>{like}</span>
                    </button>
                    <button className="text-xs text-gray-500 hover:text-white transition-colors">Reply</button>
                </div>
            </div>
        </div>
    )
}
