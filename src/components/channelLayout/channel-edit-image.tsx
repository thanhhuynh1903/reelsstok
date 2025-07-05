"use client"

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

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gray-900 border border-gray-700 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <span>Upload {isAvatar ? "Profile Picture" : "Banner Image"}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400 pt-2">
            {isAvatar
              ? "Choose a square image for your profile picture"
              : "Choose a wide image for your channel banner"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area - Fixed click handler */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
              dragActive 
                ? "border-purple-500 bg-purple-900/20" 
                : "border-gray-700 hover:border-gray-500 bg-gray-800/30"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={triggerFileInput}
            style={{ cursor: "pointer" }}
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <div
                  className={`mx-auto overflow-hidden ${
                    isAvatar ? "w-32 h-32 rounded-full" : "w-full h-32 rounded-lg"
                  }`}
                >
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  className="absolute top-0 right-0 rounded-full -mt-2 -mr-2"
                  onClick={removeImage}
                >
                  <X className="w-3 h-3" />
                </Button>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="text-white text-sm font-medium bg-gray-800/80 px-3 py-1.5 rounded-full">
                    Click to change
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-300 mb-2 font-medium">Drag and drop an image here</p>
                <p className="text-gray-400 text-sm mb-4">or click to browse files</p>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  onClick={(e) => {
                    e.stopPropagation()
                    triggerFileInput()
                  }}
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
          <div className="text-xs text-gray-400 space-y-1 bg-gray-800/40 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <p>Recommended size: <span className="text-white">{recommendedSize}</span></p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <p>Maximum file size: <span className="text-white">{maxSize / (1024 * 1024)}MB</span></p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <p>Supported formats: <span className="text-white">JPG, PNG, GIF</span></p>
            </div>
          </div>

          {selectedFile && (
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-gray-400 text-xs">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-xs">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  Ready to upload
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 mt-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="border-gray-700 text-white hover:bg-gray-800 bg-gray-800/50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!previewUrl || isLoading}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
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