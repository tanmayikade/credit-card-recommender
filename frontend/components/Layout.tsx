"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { isAuthenticated, removeCookie } from "../lib/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const [dark, setDark] = useState(false)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem("theme") === "dark"
      setDark(isDark)
      document.documentElement.classList.toggle("dark", isDark)
    }
  }, [])

  useEffect(() => {
    setAuth(isAuthenticated())
  }, [])

  const toggleDark = () => {
    setDark((prev) => {
      const newDark = !prev
      document.documentElement.classList.toggle("dark", newDark)
      localStorage.setItem("theme", newDark ? "dark" : "light")
      return newDark
    })
  }

  const handleLogout = () => {
    removeCookie("auth_token")
    setAuth(false)
    toast.success("Logout successful!")
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="bg-white dark:bg-gray-950 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-primary-600 dark:text-primary-400 font-bold text-xl transition-colors duration-300">
                Maxx Mai Card
              </Link>
            </div>
            <nav className="flex space-x-8 items-center">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname === "/"
                    ? "border-primary-500 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/spending"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname === "/spending"
                    ? "border-primary-500 text-gray-900 dark:text-gray-100"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Spending
              </Link>
              {auth && (
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4" />
                  </svg>
                  Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Maxx Mai Card. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <a href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout