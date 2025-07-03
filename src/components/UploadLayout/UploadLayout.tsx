"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { UploadDropzone } from "./UploadZone"
import { VideoPreview } from "./UploadReview"
import { VideoEditor } from "./UploadEditor"
import { VideoDetails } from "./UploadDetail"
import { PublishSettings } from "./UploadSetting"
import { UploadProgress } from "./UploadProgress"
import { X, ArrowLeft, ArrowRight } from "lucide-react"

interface VideoFile {
  file: File
  url: string
  duration: number
  thumbnail: string
  size: number
}

interface VideoData {
  title: string
  description: string
  tags: string[]
  category: string
  visibility: "public" | "private" | "unlisted"
  allowComments: boolean
  allowDownload: boolean
  thumbnail: string
  scheduledDate?: Date
}

interface UploadLayoutProps {
  onClose: () => void
  className?: string
}

export function UploadLayout({ onClose, className = "" }: UploadLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [videoFile, setVideoFile] = useState<VideoFile | null>(null)
  const [videoData, setVideoData] = useState<VideoData>({
    title: "",
    description: "",
    tags: [],
    category: "",
    visibility: "public",
    allowComments: true,
    allowDownload: false,
    thumbnail: "",
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const layoutRef = useRef<HTMLDivElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)

  const steps = [
    { id: "upload", title: "Upload Video", component: "dropzone" },
    { id: "preview", title: "Preview", component: "preview" },
    { id: "edit", title: "Edit", component: "editor" },
    { id: "details", title: "Details", component: "details" },
    { id: "publish", title: "Publish", component: "publish" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layoutRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      )
    }, layoutRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(stepRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
    }, stepRef)

    return () => ctx.revert()
  }, [currentStep])

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement("video")
    video.src = url
    video.onloadedmetadata = () => {
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      video.currentTime = 1
      video.onseeked = () => {
        ctx?.drawImage(video, 0, 0)
        const thumbnail = canvas.toDataURL()

        setVideoFile({
          file,
          url,
          duration: video.duration,
          thumbnail,
          size: file.size,
        })
        setVideoData((prev) => ({ ...prev, thumbnail }))
        setCurrentStep(1)
      }
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublish = async () => {
    setIsUploading(true)
    setCurrentStep(steps.length) // Show progress step

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsUploading(false)
    onClose()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <UploadDropzone onFileUpload={handleFileUpload} />
      case 1:
        return videoFile && <VideoPreview videoFile={videoFile} />
      case 2:
        return videoFile && <VideoEditor videoFile={videoFile} onUpdate={setVideoFile} />
      case 3:
        return <VideoDetails videoData={videoData} onUpdate={setVideoData} videoFile={videoFile} />
      case 4:
        return <PublishSettings videoData={videoData} onUpdate={setVideoData} onPublish={handlePublish} />
      default:
        return <UploadProgress progress={uploadProgress} isComplete={!isUploading} />
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}
    >
      <div
        ref={layoutRef}
        className="w-full max-w-6xl h-full max-h-[100vh] bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Upload Short Video</h1>
            {currentStep < steps.length && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>•</span>
                <span>{steps[currentStep]?.title}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < steps.length && (
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`
                    flex items-center space-x-2 text-sm
                    ${index <= currentStep ? "text-purple-400" : "text-gray-500"}
                  `}
                >
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                      ${index < currentStep ? "bg-purple-600 text-white" : index === currentStep ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"}
                    `}
                  >
                    {index + 1}
                  </div>
                  <span className="hidden md:block">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div ref={stepRef} className="flex-1 overflow-hidden">
          {renderStepContent()}
        </div>

        {/* Footer */}
        {currentStep < steps.length && currentStep > 0 && (
          <div className="flex items-center justify-between p-6 border-t border-gray-800">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={currentStep === steps.length - 1 ? handlePublish : handleNext}
              disabled={currentStep === 0 && !videoFile}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? "Publish" : "Next"}</span>
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
