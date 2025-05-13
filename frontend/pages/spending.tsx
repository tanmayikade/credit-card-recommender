"use client"

import { useState, useEffect } from "react"
import { api } from "../lib/api"
import SpendingForm from "../components/SpendingForm"
import CardRecommendation from "../components/CardRecommendation"
import ErrorAlert from "../components/ErrorAlert"
import LoadingSpinner from "../components/LoadingSpinner"

interface SpendCategories {
  dining: number
  groceries: number
  travel: number
}

interface Card {
  name: string
  description: string
  annual_fee: number
  signup_bonus: number
  rewards: Record<string, number>
  features: string[]
}

interface Recommendation {
  best_card: Card
  score: number
  alternatives: Card[]
  spends: SpendCategories
}

export default function Spending() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingStatement, setIsLoadingStatement] = useState(false)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(document.cookie.includes("auth_token"))
    }
  }, [])

  const handleSubmit = async (spends: SpendCategories) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.post("/recommend", { spends })
      setRecommendation(response.data)
    } catch (err: any) {
      console.error("Error getting recommendation:", err)
      setError(err.response?.data?.detail || "Failed to get recommendation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStatement = async () => {
    if (!isAuthenticated) {
      setError("You need to connect your Gmail account first.")
      return
    }

    try {
      setIsLoadingStatement(true)
      setError(null)

      const response = await api.get("/statements/fetch")
      const { spends } = response.data

      // Get recommendation based on fetched spends
      await handleSubmit(spends)
    } catch (err: any) {
      console.error("Error fetching statement:", err)
      setError(err.response?.data?.detail || "Failed to fetch statement. Please try again or enter spending manually.")
    } finally {
      setIsLoadingStatement(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Spending Analysis</h1>

      {isAuthenticated && (
        <div className="mb-8">
          <button onClick={fetchStatement} disabled={isLoadingStatement} className="btn-secondary">
            {isLoadingStatement ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Fetching...</span>
              </>
            ) : (
              "Fetch Latest E-Statement"
            )}
          </button>
          <p className="text-sm text-gray-500 mt-2">This will analyze your latest e-statement from Gmail.</p>
        </div>
      )}

      <div className="card p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Your Monthly Spending</h2>
        <SpendingForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {error && <ErrorAlert message={error} />}

      {recommendation && <CardRecommendation recommendation={recommendation} />}
    </div>
  )
}