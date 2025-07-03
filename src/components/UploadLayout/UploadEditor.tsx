"use client"

import { useState, useRef } from "react"
import { Scissors, RotateCcw, Crop, Palette, Type, Music, Filter, Sparkles } from "lucide-react"

interface VideoFile {
  file: File
  url: string
  duration: number
  thumbnail: string
  size: number
}

interface VideoEditorProps {
  videoFile: VideoFile
  onUpdate: (videoFile: VideoFile) => void
}

export function VideoEditor({ videoFile, onUpdate }: VideoEditorProps) {
  const [activeTab, setActiveTab] = useState("trim")
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(videoFile.duration)
  const [selectedFilter, setSelectedFilter] = useState("none")
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)

  const videoRef = useRef<HTMLVideoElement>(null)

  const editorTabs = [
    { id: "trim", label: "Trim", icon: Scissors },
    { id: "rotate", label: "Rotate", icon: RotateCcw },
    { id: "crop", label: "Crop", icon: Crop },
    { id: "filters", label: "Filters", icon: Filter },
    { id: "text", label: "Text", icon: Type },
    { id: "music", label: "Music", icon: Music },
    { id: "effects", label: "Effects", icon: Sparkles },
  ]

  const filters = [
    { id: "none", name: "Original", preview: "brightness(100%)" },
    { id: "vintage", name: "Vintage", preview: "sepia(50%) contrast(120%)" },
    { id: "dramatic", name: "Dramatic", preview: "contrast(150%) brightness(90%)" },
    { id: "cool", name: "Cool", preview: "hue-rotate(180deg) saturate(120%)" },
    { id: "warm", name: "Warm", preview: "hue-rotate(30deg) saturate(110%)" },
    { id: "bw", name: "B&W", preview: "grayscale(100%)" },
  ]

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getVideoStyle = () => {
    const filterValue = filters.find((f) => f.id === selectedFilter)?.preview || "none"
    return {
      filter: `${filterValue} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "trim":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-white mb-4">Trim Video</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Start Time</label>
                  <input
                    type="range"
                    min="0"
                    max={videoFile.duration}
                    value={trimStart}
                    onChange={(e) => setTrimStart(Number.parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>{formatTime(trimStart)}</span>
                    <span>{formatTime(videoFile.duration)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">End Time</label>
                  <input
                    type="range"
                    min={trimStart}
                    max={videoFile.duration}
                    value={trimEnd}
                    onChange={(e) => setTrimEnd(Number.parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>{formatTime(trimStart)}</span>
                    <span>{formatTime(trimEnd)}</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-sm text-gray-300">
                    New duration: <span className="text-white font-medium">{formatTime(trimEnd - trimStart)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case "filters":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-white mb-4">Filters</h4>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`
                      relative aspect-square rounded-lg overflow-hidden border-2 transition-all
                      ${selectedFilter === filter.id ? "border-purple-500" : "border-gray-700 hover:border-gray-600"}
                    `}
                  >
                    <div
                      className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"
                      style={{ filter: filter.preview }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                      <span className="text-xs text-white">{filter.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Brightness</label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-400">{brightness}%</span>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Contrast</label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={contrast}
                  onChange={(e) => setContrast(Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-400">{contrast}%</span>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Saturation</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-400">{saturation}%</span>
              </div>
            </div>
          </div>
        )

      case "text":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-white mb-4">Add Text</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Text Content</label>
                  <input
                    type="text"
                    placeholder="Enter your text..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Font Size</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500">
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                      <option>Extra Large</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Color</label>
                    <div className="flex space-x-2">
                      {["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00"].map((color) => (
                        <button
                          key={color}
                          className="w-8 h-8 rounded-full border-2 border-gray-600"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">Coming Soon</h4>
              <p className="text-gray-400">This editing feature is under development</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="h-full flex">
      {/* Video Preview */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative bg-black rounded-2xl overflow-hidden aspect-[9/16] max-h-[440px]">
          <video
            ref={videoRef}
            src={videoFile.url}
            className="w-full h-full object-cover"
            style={getVideoStyle()}
            controls
          />
        </div>
      </div>

      {/* Editor Panel */}
      <div className="w-80 border-l border-gray-800 flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-800">
          <div className="grid grid-cols-4 gap-1 p-2">
            {editorTabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors
                    ${activeTab === tab.id ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto">{renderTabContent()}</div>

        {/* Apply Button */}
        <div className="p-6 border-t border-gray-800">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  )
}
