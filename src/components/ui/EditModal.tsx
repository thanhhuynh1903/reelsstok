"use client"

import { useState, useRef } from "react"
import { Camera, Upload, Save, User, Link, MapPin } from "lucide-react"
import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ProfileData, EditProfileModalProps } from "@/types/profile-types"
export function EditProfileModal({ isOpen, onClose, profileData, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>(profileData)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialLinkChange = (platform: keyof ProfileData["socialLinks"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const handleImageUpload = (type: "avatar" | "banner", file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (type === "avatar") {
        setFormData((prev) => ({ ...prev, avatar: result }))
      } else {
        setFormData((prev) => ({ ...prev, banner: result }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onSave(formData)
    setIsLoading(false)
    onClose()
  }

  const handleCancel = () => {
    setFormData(profileData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Edit Profile</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your profile information and customize your channel appearance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-white">
                Display Name
              </Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => handleInputChange("displayName", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Your display name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white pl-8"
                  placeholder="username"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-white">
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              placeholder="Tell people about yourself..."
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">{formData.bio.length}/500</p>
          </div>

          {/* Location & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Your location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white flex items-center">
                <Link className="w-4 h-4 mr-1" />
                Website
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <Label className="text-white">Social Links</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <Input
                  value={formData.socialLinks.twitter || ""}
                  onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">I</span>
                </div>
                <Input
                  value={formData.socialLinks.instagram || ""}
                  onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Y</span>
                </div>
                <Input
                  value={formData.socialLinks.youtube || ""}
                  onChange={(e) => handleSocialLinkChange("youtube", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://youtube.com/@username"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700 text-white">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
