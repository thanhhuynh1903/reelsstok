"use client"

import { useState } from "react"
import { ProfileEditTrigger } from "@/components/ui/TriggerModal"
import type { ProfileData } from "@/types/profile-types"
export default function ProfileEditPage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: "BuildMaster Pro",
    username: "buildmaster",
    bio: "Welcome to my channel! I create epic Minecraft builds, tutorials, and guides to help you become a better builder. Join our community of 50K+ builders and let's create amazing things together! 🏰✨",
    avatar: "/placeholder.svg?height=120&width=120",
    banner: "/placeholder.svg?height=320&width=1200",
    location: "San Francisco, CA",
    website: "https://buildmaster.com",
    socialLinks: {
      twitter: "https://twitter.com/buildmaster",
      instagram: "https://instagram.com/buildmaster",
      youtube: "https://youtube.com/@buildmaster",
    },
  })

  const handleProfileUpdate = (updatedData: ProfileData) => {
    setProfileData(updatedData)

}

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

        {/* Current Profile Preview */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={profileData.avatar || "/placeholder.svg"}
              alt={profileData.displayName}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{profileData.displayName}</h2>
              <p className="text-gray-400">@{profileData.username}</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{profileData.bio}</p>

          <ProfileEditTrigger
            profileData={profileData}
            onProfileUpdate={handleProfileUpdate}
            className="bg-purple-600 hover:bg-purple-700"
          />
        </div>

        {/* Additional Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Profile Visibility</span>
                <span className="text-green-400">Public</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Show Activity Status</span>
                <span className="text-green-400">Enabled</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <span className="text-green-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
