"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import {
    Home,
    Compass,
    TrendingUp,
    Users,
    Heart,
    Bookmark,
    Settings,
    User,
    Bell,
    Search,
    ChevronDown,
    ChevronRight,
    Menu,
    Radio,
    X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import './styles.css'
interface SidebarProps {
    isCollapsed?: boolean
    onToggle?: () => void
    className?: string
}

interface MenuItem {
    id: string
    label: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    href?: string
    badge?: string | number
    children?: MenuItem[]
    isActive?: boolean
}

interface UserProfile {
    name: string
    username: string
    avatar: string
    followers: string
    following: string
}

export function Sidebar({ isCollapsed = false, onToggle, className = "" }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(isCollapsed)
    const [expandedGroups, setExpandedGroups] = useState<string[]>(["main"])
    const [searchQuery, setSearchQuery] = useState("")
    const [showUserMenu, setShowUserMenu] = useState(false)
    const router = useRouter()
    const auth = useAuth;
    const pathname = usePathname()
    const sidebarRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const handleNavigate = (href: string) => () => {
        if (href) {
            router.push(href)
        }
    }
    //Explain router.push
    // router.push is a Next.js function that allows you to programmatically navigate to a different route in your application. It updates the URL and renders the corresponding page without a full page reload, maintaining the single-page application (SPA) behavior. This is useful for navigation after actions like form submissions or button clicks.
    const userProfile: UserProfile = {
        name: "Alex Johnson",
        username: "@alexj",
        avatar: "/placeholder.svg?height=40&width=40",
        followers: "12.5K",
        following: "892",
    }
 
    const menuItems: { [key: string]: MenuItem[] } = {
        main: [
            {
                id: "home",
                label: "Home",
                icon: Home,
                href: "/video",
            },
            {
                id: "explore",
                label: "Explore",
                icon: Compass,
                href: "/explore",
            },
            {
                id: "trending",
                label: "Trending",
                icon: TrendingUp,
                href: "/trending",
                badge: "🔥",
            },
            {
                id: "live",
                label: "Live",
                icon: Radio,
                href: "/live",
                badge: "💥",
            },
            {
                id: "following",
                label: "Following",
                icon: Users,
                href: "/following",
                badge: 5,
            },
        ],
        library: [
            {
                id: "liked",
                label: "Liked Videos",
                icon: Heart,
                href: "/liked",
            },
            {
                id: "saved",
                label: "Saved",
                icon: Bookmark,
                href: "/saved",
            },
            // {
            //     id: "playlists",
            //     label: "Playlists",
            //     icon: Plus,
            //     children: [
            //         { id: "playlist1", label: "My Favorites", icon: Heart },
            //         { id: "playlist2", label: "Watch Later", icon: Bookmark },
            //         { id: "playlist3", label: "Dance Videos", icon: TrendingUp },
            //     ],
            // },
        ],
        account: [
            {
                id: "profile",
                label: "Profile",
                icon: User,
                href: "/channels/buildmaster",
            },
            {
                id: "notifications",
                label: "Notifications",
                icon: Bell,
                href: "/notifications",
                badge: 12,
            },
            {
                id: "settings",
                label: "Settings",
                icon: Settings,
                href: "/profile/edit",
            },
        ],
    }

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
        onToggle?.()
    }

    const toggleGroup = (groupId: string) => {
        setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
    }

    const handleSignOut = () => {
    handleNavigate("/signin")();
    auth.logout();
    router.refresh();
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (collapsed) {
                gsap.to(sidebarRef.current, {
                    width: "80px",
                    duration: 0.3,
                    ease: "power2.out",
                })
                gsap.to(".sidebar-label", {
                    opacity: 0,
                    x: -20,
                    duration: 0.2,
                    ease: "power2.out",
                })
                gsap.to(".sidebar-badge", {
                    opacity: 0,
                    scale: 0,
                    duration: 0.2,
                    ease: "power2.out",
                })
            } else {
                gsap.to(sidebarRef.current, {
                    width: "280px",
                    duration: 0.3,
                    ease: "power2.out",
                })
                gsap.to(".sidebar-label", {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power2.out",
                })
                gsap.to(".sidebar-badge", {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    delay: 0.1,
                    ease: "power2.out",
                })
            }
        }, sidebarRef)

        return () => ctx.revert()
    }, [collapsed])

    const renderMenuItem = (item: MenuItem, level = 0) => {
        const isActive = item.href === pathname;
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedGroups.includes(item.id)

        return (
            <div key={item.id} className="menu-item">
                <button
                    onClick={() => {
                        if (item?.href) {
                            handleNavigate(item?.href)()
                        }
                        if (hasChildren) {
                            toggleGroup(item.id)
                        }
                    }}
                    className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                        ${level > 0 ? "ml-6 pl-8" : ""}
                        ${isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                            : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                        }
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
                    `}
                    tabIndex={0}
                    aria-current={isActive ? "page" : undefined}
                    type="button"
                >
                    <div className="flex items-center space-x-3">
                        <item.icon
                            className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                        />
                        {!collapsed && (
                            <span className={`sidebar-label font-medium ${isActive ? "text-white" : ""}`}>{item.label}</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {item.badge && !collapsed && (
                            <span
                                className={`
                                    sidebar-badge px-2 py-1 rounded-full text-xs font-medium
                                    ${typeof item.badge === "number"
                                        ? "bg-red-500 text-white"
                                        : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                    }
                                `}
                            >
                                {item.badge}
                            </span>
                        )}
                        {hasChildren && !collapsed && (
                            <div className="transition-transform duration-200">
                                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </div>
                        )}
                    </div>
                </button>
                {hasChildren && isExpanded && !collapsed && (
                    <div className="mt-2 space-y-1">{item.children?.map((child) => renderMenuItem(child, level + 1))}</div>
                )}
            </div>
        )
    }

    return (
        <div
            ref={sidebarRef}
            className={`
        fixed left-0 top-0 h-full bg-gray-950/95 backdrop-blur-xl border-r border-gray-800/50 z-50 transition-all duration-300 flex flex-col
        ${collapsed ? "w-20" : "w-70"}
        ${className}
      `}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
                {!collapsed && (
                    <div className="sidebar-label">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ReelsStok
                        </h1>
                    </div>
                )}
                <button
                    onClick={toggleCollapse}
                    className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 hover:text-white"
                >
                    {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </button>
            </div>

            {/* Search */}
            {!collapsed && (
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-10 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                        />
                    </div>
                </div>
            )}
            <div className="overflow-y-scroll hide-scrollbar">
                {/* Content */}
                <div ref={contentRef} className="flex-1 overflow-y-auto p-4 space-y-6 overflow-hidden">
                    {/* Main Navigation */}
                    <div>
                        {!collapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main</h3>}
                        <div className="space-y-1">{menuItems.main.map((item) => renderMenuItem(item))}</div>
                    </div>

                    {/* Library */}
                    <div>
                        {!collapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Library</h3>}
                        <div className="space-y-1">{menuItems.library.map((item) => renderMenuItem(item))}</div>
                    </div>

                    {/* Account */}
                    <div>
                        {!collapsed && <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Account</h3>}
                        <div className="space-y-1">{menuItems.account.map((item) => renderMenuItem(item))}</div>
                    </div>

                    {/* Quick Actions */}
                    {!collapsed && (
                        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-500/20">
                            <h4 className="font-semibold text-white mb-2">Create Content</h4>
                            <p className="text-sm text-gray-400 mb-3">Share your creativity with the world</p>
                            <button onClick={handleNavigate("/upload")} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                                Upload Video
                            </button>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="border-t border-gray-800/50 p-4">
                    <div
                        className={`
            flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800/50 transition-colors cursor-pointer
            ${collapsed ? "justify-center" : ""}
          `}
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="relative">
                            <img
                                src={userProfile.avatar || "/placeholder.svg"}
                                alt={userProfile.name}
                                className="w-10 h-10 rounded-full border-2 border-purple-500/30"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-950"></div>
                        </div>

                        {!collapsed && (
                            <div className="sidebar-label flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-white text-sm">{userProfile.name}</p>
                                        <p className="text-xs text-gray-400">{userProfile.username}</p>
                                    </div>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Menu Dropdown */}
                    {showUserMenu && !collapsed && (
                        <div className="mt-2 bg-gray-900/50 rounded-xl p-2 border border-gray-800/50">
                            <div className="flex justify-between text-center py-2">
                                <div>
                                    <p className="text-sm font-medium text-white">{userProfile.followers}</p>
                                    <p className="text-xs text-gray-400">Followers</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{userProfile.following}</p>
                                    <p className="text-xs text-gray-400">Following</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-800/50 pt-2 mt-2">
                                <button onClick={handleNavigate("/profile")} className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                                    View Profile
                                </button>
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                                    Switch Account
                                </button>
                                <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
