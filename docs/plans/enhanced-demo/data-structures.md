# Data Structures

> **📚 Part of**: [Enhanced Recipe Demo Documentation](./overview.md)  
> **🔗 Related**: [Technical Implementation](./technical-implementation.md) | [Smart Scaling](./smart-scaling.md)

---

## 🏗️ Recipe Data Format

### Complete Recipe Interface
```typescript
interface RecipeData {
  // Basic metadata
  id: string;
  title: string;
  description: string;
  originalText: string;  // Natural language input
  
  // Timing and servings
  servings: number;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  
  // User preferences
  userPreferences: {
    useImperialUnits: boolean;
    decimalPlaces: number;
    showWeight: boolean;
  };
  
  // Core data
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutritionTotals: NutritionTotals;
  
  // Scaling configuration
  scalingOptions: number[];  // [1, 2, 4, 6, 8, 12]
  smartRounding: SmartRoundingConfig;
}
```

---

## 🥘 Ingredient Structure

### Ingredient Interface
```typescript
interface Ingredient {
  // Identification
  id: string;           // "chicken-breast", "olive-oil"
  name: string;         // "chicken breasts", "olive oil"
  category: IngredientCategory;
  
  // Quantity information
  quantity: number;     // 2, 0.5, 4
  unit: string;         // "large", "cup", "tbsp"
  
  // Weight calculations (core of the system)
  weightInGrams: number;        // 400, 28, 120
  volumeInMl?: number;          // For liquids: 30ml for 2 tbsp oil
  density?: number;             // For volume→weight: olive oil = 0.92
  
  // Nutrition data (from database)
  nutritionPer100g: NutritionPer100g;
  
  // Calculated actual macros (based on weight)
  actualMacros: MacroNutrients;
  
  // Display formats
  displayWeight: DisplayWeight;
  displayQuantity: DisplayQuantity;
  
  // Parsing metadata
  parsingInfo?: ParsingInfo;
}

type IngredientCategory = 'protein' | 'carb' | 'fat' | 'vegetable' | 'fruit' | 'dairy' | 'spice' | 'liquid';
```

### Nutrition Interfaces
```typescript
interface NutritionPer100g {
  protein: number;    // grams
  carbs: number;      // grams  
  fat: number;        // grams
  fiber: number;      // grams
  sugar: number;      // grams
  sodium: number;     // milligrams
}

interface MacroNutrients {
  calories: number;   // Calculated: (protein × 4) + (carbs × 4) + (fat × 9)
  protein: number;    // grams (from nutritionPer100g × weight factor)
  carbs: number;      // grams
  fat: number;        // grams
  fiber: number;      // grams
  sodium: number;     // milligrams
}
```

### Display Formats
```typescript
interface DisplayWeight {
  metric: string;     // "400g", "30ml"
  imperial: string;   // "0.88 lbs", "1.0 fl oz"
}

interface DisplayQuantity {
  original: string;   // "2 large", "1/2 cup"
  metric: string;     // "400g chicken breast"
  imperial: string;   // "0.88 lbs chicken breast"
  withFractions: string; // "1/2 cup" instead of "0.5 cup"
}

interface ParsingInfo {
  confidence: number;     // 0.0 - 1.0
  originalText: string;   // "2 large chicken breasts"
  extractedQuantity: number;
  extractedUnit: string;
  extractedName: string;
  needsManualReview: boolean;
}
```

---

## 📋 Instruction Structure

### Instruction Interface
```typescript
interface Instruction {
  step: number;
  instruction: string;
  time?: string;              // "15 minutes", "until golden"
  isPremium: boolean;         // Show in premium preview
  
  // Enhanced instruction data
  temperature?: Temperature;
  equipmentNeeded?: string[];
  tips?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  
  // Visual aids
  imageUrl?: string;
  videoUrl?: string;
}

interface Temperature {
  celsius: number;
  fahrenheit: number;
  description?: string;  // "medium-high heat", "until bubbling"
}
```

---

## 📊 Nutrition Totals

### Complete Nutrition Summary
```typescript
interface NutritionTotals {
  // Recipe totals
  totalWeight: number;        // grams, sum of all ingredients
  servingWeight: number;      // grams per serving
  
  // Macro totals (programmatically calculated)
  calories: number;           // Sum of all ingredient calories
  protein: number;            // grams
  carbs: number;              // grams
  fat: number;                // grams
  fiber: number;              // grams
  sodium: number;             // milligrams
  
  // Per serving breakdown
  perServing: PerServingNutrition;
  
  // Nutritional analysis
  macroPercentages: MacroPercentages;
  nutritionScore?: NutritionScore;
}

interface PerServingNutrition {
  weight: DisplayWeight;      // { metric: "491g", imperial: "1.08 lbs" }
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

interface MacroPercentages {
  proteinPercent: number;     // % of calories from protein
  carbPercent: number;        // % of calories from carbs
  fatPercent: number;         // % of calories from fat
}
```

---

## ⚙️ Scaling Configuration

### Smart Rounding Configuration
```typescript
interface SmartRoundingConfig {
  enabled: boolean;
  preserveRatios: boolean;
  minimumIncrement: {
    [range: string]: number;
  };
  unitSpecificRules: UnitRoundingRules;
  ingredientExceptions: IngredientExceptions;
}

interface UnitRoundingRules {
  volume: {
    tsp: { small: 0.125, medium: 0.25, large: 0.5 };
    tbsp: { small: 0.25, medium: 0.5, large: 1 };
    cup: { small: 0.125, medium: 0.25, large: 0.5 };
  };
  weight: {
    g: { tiny: 1, small: 5, medium: 10, large: 25 };
    oz: { small: 0.25, medium: 0.5, large: 1 };
    lb: { small: 0.25, medium: 0.5, large: 1 };
  };
}

interface IngredientExceptions {
  wholeItems: string[];      // ['egg', 'chicken-breast', 'apple']
  noFractions: string[];     // Items that should always be whole numbers
  preservePrecision: string[]; // Items where precision matters (spices)
}
```

---

## 🎯 Demo-Specific Interfaces

### Demo Component Props
```typescript
interface RecipeDemoProps {
  recipeData: RecipeData;
  showPremiumTeasers?: boolean;
  enableTypewriter?: boolean;
  autoPlay?: boolean;
  theme?: 'light' | 'dark';
}

interface IngredientListProps {
  ingredients: Ingredient[];
  servings: number;
  useImperial?: boolean;
  showMacros?: boolean;
  interactive?: boolean;
}

interface ScalingInterfaceProps {
  recipe: RecipeData;
  onScaleChange?: (newServings: number) => void;
  minServings?: number;
  maxServings?: number;
  presetServings?: number[];
}
```

### State Management
```typescript
interface DemoState {
  currentTab: 'ingredients' | 'instructions' | 'nutrition' | 'scaling';
  useImperialUnits: boolean;
  currentServings: number;
  scaledRecipe: RecipeData;
  animationState: AnimationState;
  userInteractions: UserInteraction[];
}

interface AnimationState {
  typewriterComplete: boolean;
  parsingComplete: boolean;
  resultsVisible: boolean;
  currentlyAnimating: string[];
}

interface UserInteraction {
  timestamp: number;
  action: string;           // 'tab_switch', 'unit_toggle', 'scale_change'
  details: Record<string, any>;
}
```

---

## 🗄️ Database Schema

### Nutrition Database Structure
```typescript
interface NutritionDatabase {
  ingredients: {
    [ingredientId: string]: IngredientNutritionData;
  };
  conversions: ConversionDatabase;
  metadata: DatabaseMetadata;
}

interface IngredientNutritionData {
  id: string;
  name: string;
  category: IngredientCategory;
  aliases: string[];         // Alternative names
  
  // Nutrition per 100g (standard)
  nutrition: NutritionPer100g;
  
  // Physical properties
  density?: number;          // g/ml for liquids
  typicalPortions: TypicalPortion[];
  
  // Metadata
  source: string;            // "USDA", "manufacturer"
  confidence: number;        // Data reliability score
  lastUpdated: string;
}

interface TypicalPortion {
  description: string;       // "1 large", "1 cup chopped"
  weightInGrams: number;
  commonUse: string;         // "baking", "salads", "main course"
}

interface ConversionDatabase {
  volumeToWeight: {
    [ingredient: string]: {
      [unit: string]: number; // grams per unit
    };
  };
  unitConversions: {
    volume: Record<string, number>;  // ml conversions
    weight: Record<string, number>;  // gram conversions
  };
}
```

---

## 📱 API Response Format

### Recipe Parsing API Response
```typescript
interface RecipeParsingResponse {
  success: boolean;
  confidence: number;        // Overall parsing confidence
  processingTime: number;    // milliseconds
  
  data: {
    recipe: RecipeData;
    alternatives?: RecipeData[]; // Alternative interpretations
    warnings: ParsingWarning[];
  };
  
  metadata: {
    model: string;           // AI model version
    timestamp: string;
    inputHash: string;       // For caching
  };
}

interface ParsingWarning {
  type: 'quantity' | 'ingredient' | 'unit' | 'instruction';
  message: string;
  suggestion?: string;
  severity: 'low' | 'medium' | 'high';
  affectedText: string;
}
```

### Scaling API Response
```typescript
interface ScalingResponse {
  success: boolean;
  scaledRecipe: RecipeData;
  scalingInfo: {
    originalServings: number;
    newServings: number;
    scaleFactor: number;
    roundingApplied: RoundingApplication[];
  };
  warnings: ScalingWarning[];
}

interface RoundingApplication {
  ingredientId: string;
  originalQuantity: number;
  rawScaled: number;
  smartRounded: number;
  ruleApplied: string;
}

interface ScalingWarning {
  type: 'ratio_change' | 'precision_loss' | 'unit_conversion';
  message: string;
  ingredientId: string;
  severity: 'info' | 'warning' | 'error';
}
```

---

## 🎨 Example Data

### Complete Grilled Chicken Salad Example
```typescript
const grilledChickenSalad: RecipeData = {
  id: "grilled-chicken-salad",
  title: "Grilled Chicken Salad",
  description: "A healthy, protein-packed salad perfect for lunch or dinner",
  originalText: "Take 2 large chicken breasts and grill them with salt and pepper...",
  
  servings: 2,
  prepTime: "15 minutes",
  cookTime: "15 minutes",
  totalTime: "30 minutes",
  
  userPreferences: {
    useImperialUnits: false,
    decimalPlaces: 1,
    showWeight: true
  },
  
  ingredients: [
    {
      id: "chicken-breast",
      name: "chicken breasts",
      category: "protein",
      quantity: 2,
      unit: "large",
      
      weightInGrams: 400,
      
      nutritionPer100g: {
        protein: 29.0,
        carbs: 0.0,
        fat: 3.5,
        fiber: 0.0,
        sodium: 75
      },
      
      actualMacros: {
        calories: 620,    // (116×4) + (0×4) + (14×9) = 620
        protein: 116.0,   // 29.0 × (400g/100g) = 116.0g
        carbs: 0.0,
        fat: 14.0,
        fiber: 0.0,
        sodium: 300
      },
      
      displayWeight: {
        metric: "400g",
        imperial: "0.88 lbs"
      },
      
      displayQuantity: {
        original: "2 large",
        metric: "400g chicken breast",
        imperial: "0.88 lbs chicken breast",
        withFractions: "2 large"
      }
    }
    // ... more ingredients
  ],
  
  nutritionTotals: {
    totalWeight: 982,
    servingWeight: 491,
    calories: 982,
    protein: 121.4,
    carbs: 20.2,
    fat: 42.6,
    fiber: 6.1,
    sodium: 445,
    
    perServing: {
      weight: { metric: "491g", imperial: "1.08 lbs" },
      calories: 491,
      protein: 60.7,
      carbs: 10.1,
      fat: 21.3,
      fiber: 3.1,
      sodium: 223
    },
    
    macroPercentages: {
      proteinPercent: 49.7,  // (121.4g × 4 cal/g) / 982 total cal
      carbPercent: 8.2,
      fatPercent: 42.1
    }
  },
  
  scalingOptions: [1, 2, 4, 6, 8, 12],
  
  smartRounding: {
    enabled: true,
    preserveRatios: true,
    minimumIncrement: {
      "< 1": 0.125,
      "< 5": 0.25,
      "< 20": 0.5,
      "< 100": 5,
      ">= 100": 10
    }
  }
};
```

---

**🔗 Next**: See [Implementation Plan](./implementation-plan.md) for development phases.

**⚙️ Technical**: Check [Technical Implementation](./technical-implementation.md) for the calculation engine. 