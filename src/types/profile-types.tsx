export interface ProfileData {
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

export interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profileData: ProfileData
  onSave: (data: ProfileData) => void
}
