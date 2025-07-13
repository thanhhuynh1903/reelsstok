"use client"
import { LiveLayout } from "@/components/LiveLayout"
import { UseQueryNoToken } from "@/lib/Query/QueryClient"
import type { TikTokVideo } from "@/types/video-types";
export default function page() {
    const { data } = UseQueryNoToken({
        queryKey: ['gaming'],
        endpoint: `${process.env.NEXT_PUBLIC_API_URL_APIFY}`,
        enabled: true,
    });
    const videos = Array.isArray(data) ? (data.filter((video) => video.id) as TikTokVideo[]) : [];

    return (
        <div className="min-h-screen bg-black">
            <LiveLayout isLive={false} videos={videos} />
        </div>
    )
}
