"use client"
import { LiveLayout } from "@/components/LiveLayout"
export default function page() {
    return (
        <div className="min-h-screen bg-black">
            <LiveLayout isLive={false}/>
        </div>
    )
}
