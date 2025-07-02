"use client";
import { ChannelLayout } from "@/components/channelLayout/channel-layout"
import { useEffect, useState } from "react";
interface Props {
  params: Promise<{ username: string[] }>;
}
export default function ChannelPage({ params }: Props) {
  const [username, setUsername] = useState<string[]>([]);
  useEffect(() => {
    params.then((params) => {
      setUsername(params.username);
    });
  }, [params]);
  // Mock channel data - in real app, fetch based on params.username
  const channelData = {
    id: "channel-123",
    username: "buildmaster",
    displayName: "BuildMaster Pro",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFdupUSSbQ3Zx2H3xcvQfH1UfcdYLjCL2a7Q&s",
    banner: "https://wallpapercat.com/w/full/5/d/f/2614-3840x2160-desktop-4k-cyberpunk-2077-wallpaper-photo.jpg",
    bio: "Welcome to my channel! I create epic Minecraft builds, tutorials, and guides to help you become a better builder. Join our community of 50K+ builders and let's create amazing things together! 🏰✨",
    followers: 52300,
    following: 1250,
    totalViews: 15600000,
    totalVideos: 156,
    joinDate: "March 2022",
    isVerified: true,
    isLive: true,
    badges: ["🏆", "⭐"],
    socialLinks: {
      twitter: "https://twitter.com/buildmaster",
      instagram: "https://instagram.com/buildmaster",
      website: "https://buildmaster.com",
    },
  }

  // Check if this is the user's own channel (mock logic)
  const isOwnChannel = username.includes("buildmaster");

  return <ChannelLayout channelData={channelData} isOwnChannel={isOwnChannel} />
}
