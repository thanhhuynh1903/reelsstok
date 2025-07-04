"use client"

import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "./Button"
import { EditProfileModal } from "./EditModal"

interface ProfileData {
  displayName: string
  username: string
  bio: string
  avatar: string
  banner: string
  location: string
  website: string
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
  }
}

interface ProfileEditTriggerProps {
  profileData: ProfileData
  onProfileUpdate: (data: ProfileData) => void
  className?: string
}

export function ProfileEditTrigger({ profileData, onProfileUpdate, className }: ProfileEditTriggerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSave = (updatedData: ProfileData) => {
    onProfileUpdate(updatedData)
    // You could also trigger a toast notification here
    console.log("Profile updated:", updatedData)
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className={className} variant="default">
        <Edit className="w-4 h-4 mr-2" />
        Edit Profile
      </Button>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileData={profileData}
        onSave={handleSave}
      />
    </>
  )
}
