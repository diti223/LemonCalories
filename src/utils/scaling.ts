import type { IngredientData, DisplayIngredient } from '../types/recipe';

export const ingredientsData: Record<string, IngredientData> = {
  'chicken-breast': { baseQuantity: 2, baseWeight: 400, unit: 'whole', type: 'protein' },
  'mixed-greens': { baseQuantity: 4, baseWeight: 120, unit: 'cups', type: 'vegetable' },
  'cucumber': { baseQuantity: 0.5, baseWeight: 150, unit: 'whole', type: 'vegetable' },
  'tomato': { baseQuantity: 1, baseWeight: 180, unit: 'medium', type: 'vegetable' },
  'red-onion': { baseQuantity: 0.25, baseWeight: 40, unit: 'whole', type: 'vegetable' },
  'olive-oil': { baseQuantity: 2, baseWeight: 28, unit: 'tbsp', type: 'fat' },
  'lemon-juice': { baseQuantity: 1, baseWeight: 15, unit: 'squeeze', type: 'acid' }
};

export function smartRound(value: number, unit: string, type: string): number {
  if (type === 'protein' || unit === 'whole') {
    return Math.round(value);
  }
  
  if (value < 1) {
    return Math.round(value * 8) / 8; // 1/8 increments
  } else if (value < 10) {
    return Math.round(value * 4) / 4; // 1/4 increments
  } else {
    return Math.round(value);
  }
}

export function formatQuantity(quantity: number): string {
  // Convert decimal fractions to readable fractions
  const whole = Math.floor(quantity);
  const fractional = quantity - whole;
  
  if (fractional < 0.01) {
    return whole === 0 ? '' : whole.toString();
  }
  
  // Common fractions
  const fractions = [
    { decimal: 0.125, display: '⅛' },
    { decimal: 0.25, display: '¼' },
    { decimal: 0.333, display: '⅓' },
    { decimal: 0.375, display: '⅜' },
    { decimal: 0.5, display: '½' },
    { decimal: 0.625, display: '⅝' },
    { decimal: 0.667, display: '⅔' },
    { decimal: 0.75, display: '¾' },
    { decimal: 0.875, display: '⅞' }
  ];
  
  for (const fraction of fractions) {
    if (Math.abs(fractional - fraction.decimal) < 0.02) {
      return whole === 0 ? fraction.display : `${whole} ${fraction.display}`;
    }
  }
  
  return quantity.toString();
}

export function getDisplayIngredients(): DisplayIngredient[] {
  return [
    { name: 'chicken breasts', key: 'chicken-breast', note: 'Whole items → integers' },
    { name: 'cups mixed greens', key: 'mixed-greens', note: 'Even cups' },
    { name: 'cucumber', key: 'cucumber', note: 'Smart fractions' },
    { name: 'tbsp olive oil', key: 'olive-oil', note: 'Measurable units' }
  ];
} 