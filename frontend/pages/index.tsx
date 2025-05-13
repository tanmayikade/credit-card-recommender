"use client"

import { useState, useEffect } from "react"
import { api } from "../lib/api"
import { isAuthenticated } from "../lib/auth"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    setAuth(isAuthenticated())
  }, [])

  const handleConnectGmail = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await api.get("/auth/url")
      window.location.href = response.data.url
    } catch (err) {
      console.error("Failed to get auth URL:", err)
      setError("Failed to connect to Gmail. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Find Your Perfect</span>
            <span className="block text-primary-600">Credit Card</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect your Gmail to analyze your spending patterns and get personalized credit card recommendations.
          </p>
          <div className="mt-10 max-w-md mx-auto">
            <div className="rounded-md shadow">
              {auth ? (
                <button
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 cursor-default select-text gap-2"
                  disabled
                  style={{ pointerEvents: "none" }}
                >
                  <svg className="w-6 h-6 text-white mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Gmail Connected!
                </button>
              ) : (
                <button
                  onClick={handleConnectGmail}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Connecting...</span>
                    </>
                  ) : (
                    "Connect Gmail"
                  )}
                </button>
              )}
            </div>
            {error && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
            )}
            <p className="mt-3 text-sm text-gray-500">
              Or{" "}
              <a
                href="/spending"
                className="inline-flex items-center font-medium text-primary-600 hover:text-primary-500 transition-colors px-2 py-1 rounded hover:bg-primary-50 dark:hover:bg-primary-900"
              >
                <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" />
                </svg>
                Enter Spending Manually
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Smart Card Recommendations
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We analyze your spending habits to find the credit card that maximizes your rewards.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Connect Your Gmail</h3>
                  <p className="mt-2 text-base text-gray-500">
                    We securely analyze your e-statements to understand your spending patterns.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Analyze Spending</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our algorithm categorizes your spending to identify reward opportunities.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Get Recommendations</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Receive personalized credit card recommendations that maximize your rewards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}