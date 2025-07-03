"use client"

import React from "react"

import { useState, useEffect } from "react"
import { CheckCircle, Upload, Share2, Bell, Eye } from "lucide-react"

interface UploadProgressProps {
  progress: number
  isComplete: boolean
}

export function UploadProgress({ progress, isComplete }: UploadProgressProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { label: "Uploading video", icon: Upload },
    { label: "Processing video", icon: Eye },
    { label: "Generating thumbnail", icon: Eye },
    { label: "Publishing", icon: Share2 },
    { label: "Notifying subscribers", icon: Bell },
  ]

  useEffect(() => {
    if (progress < 40) setCurrentStep(0)
    else if (progress < 60) setCurrentStep(1)
    else if (progress < 80) setCurrentStep(2)
    else if (progress < 95) setCurrentStep(3)
    else setCurrentStep(4)
  }, [progress])

  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        {!isComplete ? (
          <div className="space-y-8">
            {/* Progress Circle */}
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                  className="text-purple-500 transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{progress}%</span>
              </div>
            </div>

            {/* Current Step */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">{steps[currentStep]?.label}</h3>
              <div className="flex justify-center">
                {React.createElement(steps[currentStep]?.icon || Upload, {
                  className: "w-8 h-8 text-purple-400 animate-pulse",
                })}
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-2">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={index}
                    className={`
                      flex items-center space-x-3 p-2 rounded-lg
                      ${index < currentStep ? "text-green-400" : index === currentStep ? "text-purple-400" : "text-gray-500"}
                    `}
                  >
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : <IconComponent className="w-5 h-5" />}
                    <span className="text-sm">{step.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Success Animation */}
            <div className="w-32 h-32 mx-auto bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Video Published!</h3>
              <p className="text-gray-400">Your short video is now live and ready to be discovered</p>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900/50 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-white">0</div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">0</div>
                  <div className="text-xs text-gray-400">Likes</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">0</div>
                  <div className="text-xs text-gray-400">Comments</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors">
                View Video
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors">
                Share Video
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
