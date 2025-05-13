"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { setCookie } from "../lib/auth"
import LoadingSpinner from "../components/LoadingSpinner"
import toast from "react-hot-toast"

export default function Callback() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    if (!token || typeof token !== "string") return

    // Store token in cookie
    setCookie("auth_token", token, 7) // 7 days

    // Show toast
    toast.success("Login successful!")

    // Redirect to spending page after short delay
    setTimeout(() => {
      router.replace("/spending")
    }, 1200)
  }, [token, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
        {error ? (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button onClick={() => router.push("/")} className="btn-primary">
              Go Back
            </button>
          </>
        ) : (
          <>
            <LoadingSpinner size="large" />
            <h1 className="text-2xl font-bold mt-4 mb-2">Authenticating...</h1>
            <p className="text-gray-600">Please wait while we connect your Gmail account.</p>
          </>
        )}
      </div>
    </div>
  )
}
