"use client"

import { useState } from "react"
import type { NextPage } from "next"
import api from "../lib/api"
import SpendForm from "../components/SpendForm"

interface SpendsProps {
  isAuthenticated: boolean
}

interface SpendCategories {
  dining: number
  groceries: number
  travel: number
  gas: number
  entertainment: number
  shopping: number
  utilities: number
  other: number
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

const Spends: NextPage<SpendsProps> = ({ isAuthenticated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingStatement, setIsLoadingStatement] = useState(false)
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (spends: SpendCategories) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.post("/recommend", { spends })
      setRecommendation(response.data)
    } catch (err) {
      console.error("Error getting recommendation:", err)
      setError("Failed to get recommendation. Please try again.")
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
    } catch (err) {
      console.error("Error fetching statement:", err)
      setError("Failed to fetch statement. Please try again or enter spending manually.")
    } finally {
      setIsLoadingStatement(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Spending Analysis</h1>

      {isAuthenticated && (
        <div className="mb-8">
          <button
            onClick={fetchStatement}
            disabled={isLoadingStatement}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
          >
            {isLoadingStatement ? "Fetching..." : "Fetch Latest E-Statement"}
          </button>
          <p className="text-sm text-gray-500 mt-2">This will analyze your latest e-statement from Gmail.</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Enter Your Monthly Spending</h2>
        <SpendForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">{error}</div>}

      {recommendation && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Recommended Card</h2>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-800">{recommendation.best_card.name}</h3>
            <p className="text-gray-600 mb-2">{recommendation.best_card.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {recommendation.best_card.features.map((feature, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-semibold">Annual Fee:</span> ${recommendation.best_card.annual_fee}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Sign-up Bonus:</span> ${recommendation.best_card.signup_bonus}
              </p>
              <div className="mt-2">
                <p className="text-sm font-semibold">Rewards:</p>
                <ul className="text-sm ml-4">
                  {Object.entries(recommendation.best_card.rewards).map(([category, rate]) => (
                    <li key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}: {rate}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">Alternative Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendation.alternatives.map((card, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{card.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{card.description}</p>
                <p className="text-xs">
                  <span className="font-semibold">Annual Fee:</span> ${card.annual_fee}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Spends
