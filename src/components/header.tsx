"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, Upload } from "lucide-react"
import { gsap } from "gsap"
import LogoIcon from "./LogoIcon"
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      ".header-item",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
    )
  }, [])

  return (
    <header
      className={` fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-(--my-backdrop-blur)" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="header-item">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <LogoIcon size={32} />
              ReelsStok
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex header-item flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="header-item p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Upload className="w-5 h-5" />
            </button>
            {/* <button className="header-item p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button> */}
            <Link href="/signin" className="header-item hover:text-purple-400 transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="header-item bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-purple-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <Link href="/signin" className="block py-2 hover:text-purple-400 transition-colors">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full text-center transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
