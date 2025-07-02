import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
export default function Scrollreel() {
    return (
        <div className='content-center px-4 space-y-4'>
            <div className="content-center rounded-full transform bg-gray-800/80 backdrop-blur-md p-4 space-y-4 animate-bounce">
                <ChevronUp className="w-4 h-4 text-white " />
            </div>
            <div className="content-center rounded-full transform bg-gray-800/80 backdrop-blur-md p-4 space-y-4 animate-bounce">
                <ChevronDown className="w-4 h-4 text-white " />
            </div>
        </div>
    )
}
