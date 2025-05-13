"use client"

import type React from "react"
import { useState } from "react"

interface SpendingFormProps {
  onSubmit: (spends: SpendCategories) => void
  isLoading: boolean
}

interface SpendCategories {
  dining: number
  groceries: number
  travel: number
}

const SpendingForm: React.FC<SpendingFormProps> = ({ onSubmit, isLoading }) => {
  const [spends, setSpends] = useState<SpendCategories>({
    dining: 0,
    groceries: 0,
    travel: 0,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof SpendCategories, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseFloat(value)

    // Validate input
    if (value && (isNaN(numValue) || numValue < 0)) {
      setErrors((prev) => ({ ...prev, [name]: "Please enter a valid amount" }))
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof SpendCategories]
        return newErrors
      })
    }

    setSpends((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : numValue,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Partial<Record<keyof SpendCategories, string>> = {}
    let hasErrors = false

    Object.entries(spends).forEach(([key, value]) => {
      if (isNaN(value) || value < 0) {
        newErrors[key as keyof SpendCategories] = "Please enter a valid amount"
        hasErrors = true
      }
    })

    if (hasErrors) {
      setErrors(newErrors)
      return
    }

    // Calculate total spend
    const totalSpend = Object.values(spends).reduce((sum, value) => sum + value, 0)

    if (totalSpend === 0) {
      setErrors({ dining: "Please enter at least one spending category" })
      return
    }

    onSubmit(spends)
  }

  const totalSpend = Object.values(spends).reduce((sum, value) => sum + value, 0)

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label htmlFor="dining" className="block text-sm font-medium text-gray-700 mb-1">
            Dining
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="dining"
              name="dining"
              min="0"
              step="10"
              value={spends.dining || ""}
              onChange={handleChange}
              className={`input pl-7 ${errors.dining ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}`}
              placeholder="0.00"
            />
          </div>
          {errors.dining && <p className="mt-1 text-sm text-red-600">{errors.dining}</p>}
        </div>

        <div>
          <label htmlFor="groceries" className="block text-sm font-medium text-gray-700 mb-1">
            Groceries
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="groceries"
              name="groceries"
              min="0"
              step="10"
              value={spends.groceries || ""}
              onChange={handleChange}
              className={`input pl-7 ${errors.groceries ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}`}
              placeholder="0.00"
            />
          </div>
          {errors.groceries && <p className="mt-1 text-sm text-red-600">{errors.groceries}</p>}
        </div>

        <div>
          <label htmlFor="travel" className="block text-sm font-medium text-gray-700 mb-1">
            Travel
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="travel"
              name="travel"
              min="0"
              step="10"
              value={spends.travel || ""}
              onChange={handleChange}
              className={`input pl-7 ${errors.travel ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}`}
              placeholder="0.00"
            />
          </div>
          {errors.travel && <p className="mt-1 text-sm text-red-600">{errors.travel}</p>}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          Total Monthly Spend: <span className="text-primary-600">${totalSpend.toFixed(2)}</span>
        </div>
        <button type="submit" disabled={isLoading || Object.keys(errors).length > 0} className="btn-primary">
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </>
          ) : (
            "Get Recommendation"
          )}
        </button>
      </div>
    </form>
  )
}

export default SpendingForm
