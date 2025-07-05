"use client"
import { LiveLayout } from "@/components/ui/LiveLayout"
export default function page() {
    return (
        <div className="min-h-screen bg-black">
            <LiveLayout isLive={true} />
        </div>
    )
}
