"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import api from "../lib/api"
import type { NextPage } from "next"

interface HomeProps {
  isAuthenticated: boolean
}

const Home: NextPage<HomeProps> = ({ isAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleConnectGmail = async () => {
    try {
      setIsLoading(true)
      const response = await api.get("/auth/url")
      window.location.href = response.data.url
    } catch (error) {
      console.error("Error getting auth URL:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Maxx Mai Card</h1>
        <p className="text-gray-600 mb-8 text-center">Find the best credit card for your spending habits</p>

        {isAuthenticated ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              You're connected! Now you can view your spending analysis or enter your spending manually.
            </p>
            <button
              onClick={() => router.push("/spends")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Spending Analysis
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnectGmail}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? "Connecting..." : "Connect Gmail"}
          </button>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't want to connect Gmail? You can still{" "}
            <a href="/spends" className="text-blue-600 hover:underline">
              enter your spending manually
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
