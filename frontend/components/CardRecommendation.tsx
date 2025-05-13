import type React from "react"

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

interface CardRecommendationProps {
  recommendation: Recommendation
}

const CardRecommendation: React.FC<CardRecommendationProps> = ({ recommendation }) => {
  const { best_card, alternatives } = recommendation

  return (
    <div className="card">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Recommended Card</h2>

        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-6 mb-6 text-white shadow-lg transform transition-transform hover:scale-[1.01]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-1">{best_card.name}</h3>
              <p className="text-primary-100 mb-4">{best_card.description}</p>
            </div>
            <div className="bg-white text-primary-700 rounded-full px-3 py-1 text-sm font-semibold">Best Match</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-primary-100 text-sm">Annual Fee</p>
              <p className="text-xl font-semibold">${best_card.annual_fee}</p>
            </div>
            <div>
              <p className="text-primary-100 text-sm">Sign-up Bonus</p>
              <p className="text-xl font-semibold">${best_card.signup_bonus}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-primary-100 text-sm mb-2">Rewards</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(best_card.rewards).map(([category, rate]) => (
                <div key={category} className="bg-primary-600 bg-opacity-50 rounded px-3 py-2">
                  <span className="capitalize">{category}</span>: <span className="font-semibold">{rate}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-primary-100 text-sm mb-2">Features</p>
            <div className="flex flex-wrap gap-2">
              {best_card.features.map((feature, index) => (
                <span key={index} className="bg-white text-primary-700 text-xs px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {alternatives.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Alternative Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternatives.map((card, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900">{card.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                  <div className="flex justify-between text-sm">
                    <span>
                      Annual Fee: <span className="font-medium">${card.annual_fee}</span>
                    </span>
                    <span>
                      Bonus: <span className="font-medium">${card.signup_bonus}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CardRecommendation