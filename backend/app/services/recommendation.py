import yaml
import os
from typing import Dict, Any, List
from app.models.statement import SpendCategories

def recommend_card(spends: SpendCategories):
    """Recommend the best card based on spending patterns"""
    # Load cards from YAML
    cards_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "cards.yaml")
    with open(cards_path, "r") as f:
        cards_data = yaml.safe_load(f)
    
    # Calculate scores for each card
    scores = []
    for card in cards_data["cards"]:
        score = calculate_card_score(card, spends)
        scores.append({
            "card": card,
            "score": score
        })
    
    # Sort by score (descending)
    scores.sort(key=lambda x: x["score"], reverse=True)
    
    # Return the best card and alternatives
    best_card = scores[0]["card"]
    alternatives = [s["card"] for s in scores[1:]]
    
    return {
        "best_card": best_card,
        "score": scores[0]["score"],
        "alternatives": alternatives,
        "spends": spends.dict()
    }

def calculate_card_score(card: Dict[str, Any], spends: SpendCategories) -> float:
    """Calculate a score for a card based on spending patterns"""
    score = 0
    
    # Calculate rewards based on spending categories
    rewards = card.get("rewards", {})
    
    # Dining rewards
    if "dining" in rewards and spends.dining > 0:
        score += spends.dining * rewards["dining"] / 100
    
    # Groceries rewards
    if "groceries" in rewards and spends.groceries > 0:
        score += spends.groceries * rewards["groceries"] / 100
    
    # Travel rewards
    if "travel" in rewards and spends.travel > 0:
        score += spends.travel * rewards["travel"] / 100
    
    # Gas rewards
    if "gas" in rewards and spends.gas > 0:
        score += spends.gas * rewards["gas"] / 100
    
    # Entertainment rewards
    if "entertainment" in rewards and spends.entertainment > 0:
        score += spends.entertainment * rewards["entertainment"] / 100
    
    # Shopping rewards
    if "shopping" in rewards and spends.shopping > 0:
        score += spends.shopping * rewards["shopping"] / 100
    
    # Utilities rewards
    if "utilities" in rewards and spends.utilities > 0:
        score += spends.utilities * rewards["utilities"] / 100
    
    # Other rewards
    if "other" in rewards and spends.other > 0:
        score += spends.other * rewards["other"] / 100
    
    # General rewards (applies to all spending)
    if "general" in rewards:
        total_spend = (
            spends.dining + 
            spends.groceries + 
            spends.travel + 
            spends.gas + 
            spends.entertainment + 
            spends.shopping + 
            spends.utilities + 
            spends.other
        )
        score += total_spend * rewards["general"] / 100
    
    # Subtract annual fee
    if "annual_fee" in card:
        score -= card["annual_fee"]
    
    # Add sign-up bonus (prorated for a year)
    if "signup_bonus" in card:
        score += card["signup_bonus"] / 12
    
    return score
