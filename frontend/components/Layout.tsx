"use client"

import type { FC, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { removeCookie } from "../lib/auth"

interface LayoutProps {
  children: ReactNode
  isAuthenticated: boolean
}

const Layout: FC<LayoutProps> = ({ children, isAuthenticated }) => {
  const router = useRouter()

  const handleLogout = () => {
    removeCookie("auth_token")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Maxx Mai Card
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/spends" className="text-gray-600 hover:text-blue-600">
                  Spending
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
                    Logout
                  </button>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Maxx Mai Card. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout
