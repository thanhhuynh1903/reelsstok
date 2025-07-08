"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { gsap } from "gsap"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { loginUser } from "../redux/actions/loginSlice"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/navigation"
export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch();
  const { loading, error, status } = useAppSelector((state: any) => state.login);
  //useAppSelector sẽ đọc dữ liệu state bộ nhớ của Redux, useSelector là 1 redux hook
  const handleLogin = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };
useEffect(() => {
  if (!loading && !error && status === 200) {
    router.push("/video");
  }
}, [loading, error, status, router]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".signin-form", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      gsap.fromTo(
        ".signin-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" },
      )
      gsap.fromTo(
        ".signin-field",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin(formData.email, formData.password)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="signin-form relative z-10 w-full max-w-md">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <h1 className="signin-title text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your ReelsStok account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="signin-field">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="signin-field">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3 pr-12 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="signin-field flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="signin-field w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >

              {loading ? (
                <ClipLoader color="#a78bfa" size={16} />
              )
                : (
                  "Sign In"
                )}
            </button>
          </form>

          <div className="signin-field mt-8 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Social login */}
          <div className="signin-field mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl py-3 px-4 transition-colors">
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl py-3 px-4 transition-colors">
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
