"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import api from "../../lib/api"
import { setCookie } from "../../lib/auth"

const Callback = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    if (!code) return

    const processCallback = async () => {
      try {
        const response = await api.get(`/auth/callback?code=${code}`)
        const { access_token } = response.data

        // Store token in cookie
        setCookie("auth_token", access_token, 7) // 7 days

        // Redirect to spends page
        router.push("/spends")
      } catch (err) {
        console.error("Error processing callback:", err)
        setError("Failed to authenticate with Gmail. Please try again.")
      }
    }

    processCallback()
  }, [code, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-gray-600 mt-4">Please wait while we connect your Gmail account.</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Callback
