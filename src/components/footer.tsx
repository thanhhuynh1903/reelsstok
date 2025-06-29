"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Play,
  Upload,
  Users,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer sections on scroll
      gsap.fromTo(
        ".footer-section",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate social icons
      gsap.fromTo(
        ".social-icon",
        {
          scale: 0,
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-icons",
            start: "top 90%",
          },
        },
      )

      // Floating animation for logo
      gsap.to(".footer-logo", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about", icon: Users },
      { name: "Careers", href: "/careers", icon: Upload },
      { name: "Press", href: "/press", icon: FileText },
      { name: "Blog", href: "/blog", icon: Play },
    ],
    support: [
      { name: "Help Center", href: "/help", icon: HelpCircle },
      { name: "Safety", href: "/safety", icon: Shield },
      { name: "Community Guidelines", href: "/guidelines", icon: FileText },
      { name: "Contact Us", href: "/contact", icon: Mail },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Copyright", href: "/copyright" },
    ],
    creators: [
      { name: "Creator Portal", href: "/creators" },
      { name: "Upload Guidelines", href: "/upload-guidelines" },
      { name: "Monetization", href: "/monetization" },
      { name: "Analytics", href: "/analytics" },
    ],
  }

  const socialLinks = [
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "hover:text-red-400" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-400" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-blue-400" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-500" },
  ]

  return (
    <footer ref={footerRef} className="bg-gray-950 border-t border-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand section */}
          <div className="footer-section lg:col-span-2">
            <div className="footer-logo mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                StreamVibe
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Join millions of creators sharing their stories through short, engaging videos. Discover trending content
              and build your community on the world's fastest-growing video platform.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>hello@streamvibe.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Company links */}
          <div className="footer-section">
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <IconComponent className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Support links */}
          <div className="footer-section">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                    >
                      <IconComponent className="w-4 h-4 text-pink-400 group-hover:text-pink-300 transition-colors" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Creators links */}
          <div className="footer-section">
            <h4 className="text-white font-semibold mb-4">For Creators</h4>
            <ul className="space-y-3">
              {footerLinks.creators.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="footer-section bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay in the Loop</h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates on new features, trending creators, and platform news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social media and legal */}
        <div className="footer-section border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social media */}
            <div className="social-icons flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`social-icon p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-all duration-300 transform hover:scale-110 ${social.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              {footerLinks.legal.map((link, index) => (
                <span key={link.name} className="flex items-center">
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && <span className="ml-6 text-gray-600">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 StreamVibe. All rights reserved. Made with ❤️ for creators worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
