import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
export default function Scrollreel() {
    return (
        <div className='content-center px-4 space-y-4'>
            <div className="content-center rounded-full transform bg-gray-800/80 backdrop-blur-md p-4 space-y-4">
                <ChevronUp className="w-4 h-4 text-white animate-bounce" />
            </div>
            <div className="content-center rounded-full transform bg-gray-800/80 backdrop-blur-md p-4 space-y-4">
                <ChevronDown className="w-4 h-4 text-white animate-bounce" />
            </div>
        </div>
    )
}
