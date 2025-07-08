"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react"
import { gsap } from "gsap"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { registerUser } from "../redux/actions/RegisterAction"
import { useRouter } from "next/navigation"
import { ClipLoader } from "react-spinners"
export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.login);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  //useAppSelector sẽ đọc dữ liệu state bộ nhớ của Redux, useSelector là 1 redux hook
  const handleRegister = (username: string, email: string, password: string) => {
    dispatch(registerUser({ username, email, password }));
    if (!error) {
      router.push("/signin")
    } else {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".signup-form", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      gsap.fromTo(
        ".signup-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" },
      )
      gsap.fromTo(
        ".signup-field",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    handleRegister(formData.username, formData.email, formData.password)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="signup-form relative z-10 w-full max-w-md">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <h1 className="signup-title text-3xl font-bold mb-2">Join ReelsStok</h1>
            <p className="text-gray-400">Create your account and start sharing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="signup-field">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            <div className="signup-field">
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

            <div className="signup-field">
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
                  placeholder="Create a password"
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

            <div className="signup-field">
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${passwordError ? "text-red-400" : "text-gray-300"} mb-2`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full bg-gray-800/50 border ${passwordError ? "border-red-700" : "border-gray-700"} rounded-xl px-12 py-3 pr-12 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${passwordError ? "text-red-400" : "text-gray-400"} hover:text-white transition-colors `}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="signup-field">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500 mt-1"
                  required
                />
                <span className="ml-2 text-sm text-gray-300">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="signin-field w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              disabled={loading || passwordError}
            >
              {loading ? (
                <ClipLoader color="#a78bfa" size={16} />
              )
                : (
                  "Create account"
                )}
            </button>
          </form>

          <div className="signup-field mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/signin" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Social login */}
          <div className="signup-field mt-6">
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
