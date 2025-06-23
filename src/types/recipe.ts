export interface IngredientData {
  baseQuantity: number;
  baseWeight: number;
  unit: string;
  type: string;
}

export interface DisplayIngredient {
  name: string;
  key: string;
  note: string;
}

export interface MacroData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface ParsedIngredient {
  id: string;
  name: string;
  quantity: number | string;
  unit: string;
  weight: string;
  macros: MacroData;
}

export interface RecipeData {
  id: string;
  title: string;
  originalText: string;
  servings: number;
  ingredients: ParsedIngredient[];
  instructions: string[];
  nutritionTotals: MacroData;
} 