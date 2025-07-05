"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Save, ImageIcon } from "lucide-react"
import { Button } from "../ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UploadImageModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (imageUrl: string) => void
  type: "avatar" | "banner"
  currentImage?: string
}

export function UploadImageModal({ isOpen, onClose, onSave, type, currentImage }: UploadImageModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || "")
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isAvatar = type === "avatar"
  const maxSize = isAvatar ? 2 * 1024 * 1024 : 5 * 1024 * 1024 // 2MB for avatar, 5MB for banner
  const recommendedSize = isAvatar ? "400x400px" : "1200x320px"

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
      return
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleSave = async () => {
    if (!previewUrl) return

    setIsLoading(true)
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSave(previewUrl)
    setIsLoading(false)
    handleClose()
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewUrl(currentImage || "")
    setDragActive(false)
    onClose()
  }

  const removeImage = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">Upload {isAvatar ? "Profile Picture" : "Banner Image"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {isAvatar
              ? "Choose a square image for your profile picture"
              : "Choose a wide image for your channel banner"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
              dragActive ? "border-purple-500 bg-purple-500/10" : "border-gray-600 hover:border-gray-500"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {previewUrl ? (
              <div className="relative">
                <div
                  className={`mx-auto overflow-hidden ${
                    isAvatar ? "w-32 h-32 rounded-full" : "w-full h-24 rounded-lg"
                  }`}
                >
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -top-2 -right-2 rounded-full"
                  onClick={removeImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300 mb-2">Drag and drop an image here, or click to select</p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>

          {/* File Info */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Recommended size: {recommendedSize}</p>
            <p>• Maximum file size: {maxSize / (1024 * 1024)}MB</p>
            <p>• Supported formats: JPG, PNG, GIF</p>
          </div>

          {selectedFile && (
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-gray-400 text-xs">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <div className="text-green-400 text-xs">Ready to upload</div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!previewUrl || isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Image
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
