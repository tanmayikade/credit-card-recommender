"use client"

import type React from "react"

import { type FC, useState } from "react"

interface SpendFormProps {
  onSubmit: (spends: SpendCategories) => void
  isLoading: boolean
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

const SpendForm: FC<SpendFormProps> = ({ onSubmit, isLoading }) => {
  const [spends, setSpends] = useState<SpendCategories>({
    dining: 0,
    groceries: 0,
    travel: 0,
    gas: 0,
    entertainment: 0,
    shopping: 0,
    utilities: 0,
    other: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSpends((prev) => ({
      ...prev,
      [name]: Number.parseFloat(value) || 0,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(spends)
  }

  const totalSpend = Object.values(spends).reduce((sum, value) => sum + value, 0)

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="dining" className="block text-sm font-medium text-gray-700 mb-1">
            Dining
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="dining"
              name="dining"
              min="0"
              step="0.01"
              value={spends.dining || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="groceries" className="block text-sm font-medium text-gray-700 mb-1">
            Groceries
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="groceries"
              name="groceries"
              min="0"
              step="0.01"
              value={spends.groceries || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="travel" className="block text-sm font-medium text-gray-700 mb-1">
            Travel
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="travel"
              name="travel"
              min="0"
              step="0.01"
              value={spends.travel || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="gas" className="block text-sm font-medium text-gray-700 mb-1">
            Gas
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="gas"
              name="gas"
              min="0"
              step="0.01"
              value={spends.gas || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="entertainment" className="block text-sm font-medium text-gray-700 mb-1">
            Entertainment
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="entertainment"
              name="entertainment"
              min="0"
              step="0.01"
              value={spends.entertainment || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="shopping" className="block text-sm font-medium text-gray-700 mb-1">
            Shopping
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="shopping"
              name="shopping"
              min="0"
              step="0.01"
              value={spends.shopping || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="utilities" className="block text-sm font-medium text-gray-700 mb-1">
            Utilities
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="utilities"
              name="utilities"
              min="0"
              step="0.01"
              value={spends.utilities || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="other" className="block text-sm font-medium text-gray-700 mb-1">
            Other
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="other"
              name="other"
              min="0"
              step="0.01"
              value={spends.other || ""}
              onChange={handleChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">
          Total Monthly Spend: <span className="text-blue-600">${totalSpend.toFixed(2)}</span>
        </div>
        <button
          type="submit"
          disabled={isLoading || totalSpend === 0}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isLoading ? "Analyzing..." : "Get Recommendation"}
        </button>
      </div>
    </form>
  )
}

export default SpendForm
