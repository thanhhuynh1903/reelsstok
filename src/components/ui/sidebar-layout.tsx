"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar as ModernSidebar } from "./sidebar"
import { usePathname } from "next/navigation"
interface SidebarLayoutProps {
  children: React.ReactNode
}


export function SidebarLayout({ children }: SidebarLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const currentUrl = usePathname();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return currentUrl !== "/" && currentUrl !== "/signin" && currentUrl !== "/signout" ? (
    <div className="min-h-screen bg-black text-white">
      <ModernSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-70"} ${isMobile ? "ml-0" : ""}`}>
        {children}
      </main>

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarCollapsed(true)} />
      )}
    </div>
  ) : (
    <>
      {children}
    </>
  )
}
