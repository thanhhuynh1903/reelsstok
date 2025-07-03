"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, Video, AlertCircle, FileVideo, Smartphone } from "lucide-react"

interface UploadDropzoneProps {
  onFileUpload: (file: File) => void
}

export function UploadDropzone({ onFileUpload }: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith("video/")) {
      return "Please select a video file"
    }

    // Check file size (max 100MB for shorts)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      return "File size must be less than 100MB"
    }

    // Check duration (will be validated after upload)
    return null
  }

  const handleFileSelect = useCallback(
    (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }

      setError(null)
      onFileUpload(file)
    },
    [onFileUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="md:h-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-1xl h-full ">
        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragOver ? "border-purple-400 bg-purple-400/10" : "border-gray-600 hover:border-gray-500"}
            ${error ? "border-red-400 bg-red-400/10" : ""}
          `}
        >
          <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileInputChange} className="hidden" />

          <div className="space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              <div
                className={`
                p-6 rounded-full transition-colors
                ${isDragOver ? "bg-purple-600" : error ? "bg-red-600" : "bg-gray-800"}
              `}
              >
                {error ? <AlertCircle className="w-8 h-8 text-white" /> : <Upload className="w-8 h-8 text-white" />}
              </div>
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {isDragOver ? "Drop your video here" : "Upload your short video"}
              </h3>
              <p className="text-gray-400">{error ? error : "Drag and drop a video file or click to browse"}</p>
            </div>

            {/* Upload Button */}
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-2 rounded-full font-small transition-colors">
              Select Video File
            </button>

            {/* File Requirements
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Maximum file size: 100MB</p>
              <p>• Supported formats: MP4, MOV, AVI, WebM</p>
              <p>• Recommended: Vertical video (9:16 aspect ratio)</p>
              <p>• Maximum duration: 60 seconds</p>
            </div> */}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-xl p-4 text-center">
            <Smartphone className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="font-medium text-white mb-1">Mobile First</h4>
            <p className="text-sm text-gray-400">Vertical videos perform best</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 text-center">
            <Video className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h4 className="font-medium text-white mb-1">High Quality</h4>
            <p className="text-sm text-gray-400">1080p or higher recommended</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 text-center">
            <FileVideo className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h4 className="font-medium text-white mb-1">Short & Sweet</h4>
            <p className="text-sm text-gray-400">Keep it under 60 seconds</p>
          </div>
        </div>
      </div>
    </div>
  )
}
