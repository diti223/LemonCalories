# How We Actually Build This Magic

*Part of the [Enhanced Recipe Demo Documentation](./overview.md)*

## The Heart of Everything: Weight-Based Calculations

Look, here's the thing that makes us different from every other recipe site out there. While they're throwing around vague estimates, we're doing real math based on actual weights. Let me show you how this works.

Our nutrition database follows the same standard that professional nutritionists use - everything is calculated per 100 grams. This isn't arbitrary; it's how food labels work, how the USDA database works, and how anyone serious about nutrition calculates macros.

```javascript
// This is our foundation - nutrition per 100g
const nutritionData = {
  "chicken-breast": {
    protein: 29.0, // grams per 100g
    carbs: 0.0,
    fat: 3.5,
    density: 1.0 // for liquids, this matters more
  },
  "mixed-greens": {
    protein: 2.0,
    carbs: 4.0,
    fat: 0.3,
    density: 1.0
  },
  "olive-oil": {
    protein: 0.0,
    carbs: 0.0,
    fat: 100.0,
    density: 0.92 // this is key - olive oil isn't the same density as water
  }
};
```

Now here's where the magic happens. When someone says "2 large chicken breasts," we convert that to actual weight (400g) and then calculate everything programmatically:

```javascript
function calculateMacros(ingredientId, weightInGrams) {
  const nutrition = nutritionData[ingredientId];
  const factor = weightInGrams / 100; // scale from per-100g to actual weight
  
  const protein = nutrition.protein * factor;
  const carbs = nutrition.carbs * factor;
  const fat = nutrition.fat * factor;
  
  // Here's our more precise calorie calculation
  const calories = (protein * 4.1) + (carbs * 4.1) + (fat * 8.84);
  
  return {
    calories: Math.round(calories),
    protein: Math.round(protein * 100) / 100, // 2 decimal places
    carbs: Math.round(carbs * 100) / 100,
    fat: Math.round(fat * 100) / 100
  };
}
```

See that calorie calculation? Most sites use the old 4/4/9 approximation (4 calories per gram of protein, 4 per gram of carbs, 9 per gram of fat). We use the more precise 4.1/4.1/8.84 values because accuracy matters when you're building something professional.

## Converting Human Language to Actual Weights

This is probably the trickiest part. When someone writes "1 large chicken breast" or "2 tablespoons olive oil," we need to figure out what that actually weighs. Here's how we handle it:

```javascript
function parseToWeight(quantity, unit, ingredientId) {
  const conversions = {
    "large": { "chicken-breast": 200 }, // 200g per large breast
    "medium": { "tomato": 180, "onion": 150 },
    "cup": { "mixed-greens": 30, "rice": 185 }, // varies by ingredient
    "tbsp": 15, // ml, then we apply density
    "tsp": 5,
    "ml": 1,
    "g": 1
  };
  
  let weightInGrams;
  
  if (conversions[unit] && typeof conversions[unit] === 'object') {
    // Ingredient-specific conversion (like "large chicken breast")
    weightInGrams = conversions[unit][ingredientId] * quantity;
  } else if (conversions[unit]) {
    // Volume conversion that needs density (like olive oil)
    const volumeInMl = conversions[unit] * quantity;
    const density = nutritionData[ingredientId]?.density || 1.0;
    weightInGrams = volumeInMl * density;
  } else {
    // When in doubt, assume it's already in grams
    weightInGrams = quantity;
  }
  
  return Math.round(weightInGrams);
}
```

The density calculation is crucial here. When someone says "2 tablespoons olive oil," that's 30ml of volume. But olive oil has a density of 0.92, so it actually weighs 28g, not 30g. These details matter when you're calculating nutrition for people who actually care about accuracy.

## Making Units Work for Everyone

Americans want to see pounds and fluid ounces. Europeans want grams and milliliters. We handle both seamlessly with smart display logic that chooses the most sensible unit for each context.

```javascript
const conversions = {
  weight: {
    gToOz: 0.035274,
    gToLb: 0.00220462,
    ozToG: 28.3495,
    lbToG: 453.592
  },
  volume: {
    mlToFlOz: 0.033814,
    mlToCup: 0.00422675,
    flOzToMl: 29.5735,
    cupToMl: 236.588
  }
};

function formatWeight(grams, useImperial = false) {
  if (!useImperial) {
    return `${grams}g`;
  }
  
  // Smart imperial display - small amounts in oz, larger in lbs
  if (grams < 28) {
    return `${convertUnits(grams, 'g', 'oz', 1)} oz`;
  } else {
    return `${convertUnits(grams, 'g', 'lb', 2)} lbs`;
  }
}
```

Notice how we don't just blindly convert everything to pounds? Small amounts show in ounces because "0.06 lbs" is meaningless to most people, but "1.7 oz" makes perfect sense.

## Smart Scaling: The Really Tricky Part

This is where we separate ourselves from the amateurs. When someone wants to scale a recipe, we don't just multiply everything by the scale factor and call it done. We actually think about what makes sense in a real kitchen.

The core principle is magnitude-based rounding. Small quantities need different precision than large quantities:

```javascript
function smartRoundQuantity(value, unit) {
  if (value < 0.1) {
    return Math.round(value * 16) / 16; // 1/16 increments for tiny amounts
  } else if (value < 1) {
    return Math.round(value * 8) / 8; // 1/8 increments
  } else if (value < 10) {
    return Math.round(value * 1) / 1; // whole numbers
  } else if (value < 50) {
    return Math.round(value / (value/10)) * (value/10); // dynamic based on size
  } else if (value < 100) {
    return Math.round(value / (value/10)) * (value/10); // keeps getting smarter
  } else {
    return Math.round(value / 10) * 10; // 10-unit increments for big numbers
  }
}
```

The brilliance is that 1.75 eggs becomes 2 eggs (because who wants to deal with 3/4 of an egg?), but 1.75 cups of flour might stay as 1.75 cups because that's a totally reasonable measurement in baking.

## Bringing It All Together

Here's how we scale an entire ingredient while keeping everything sensible:

```javascript
function scaleIngredient(ingredient, scaleFactor, useImperial = false) {
  // Always start with weight - it's our source of truth
  const newWeight = ingredient.weightInGrams * scaleFactor;
  
  // Calculate new macros based on the scaled weight
  const newMacros = calculateMacros(ingredient.id, newWeight);
  
  // Convert back to display units with smart rounding
  const newQuantity = smartRoundQuantity(
    ingredient.quantity * scaleFactor,
    ingredient.unit
  );
  
  return {
    ...ingredient,
    quantity: newQuantity,
    weightInGrams: Math.round(newWeight),
    displayWeight: formatWeight(newWeight, useImperial),
    macros: newMacros
  };
}
```

The magic is that we scale the weight (which gives us perfect macro calculations), but we also scale the display quantity intelligently so the recipe still makes sense to cook from.

## Making It Feel Alive: The Animation Layer

Users don't just want accurate calculations - they want the experience to feel responsive and delightful. Here's how we make the typewriter effect work:

```javascript
class TypewriterEffect {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.currentIndex = 0;
  }
  
  async start() {
    for (let i = 0; i < this.text.length; i++) {
      this.element.textContent += this.text[i];
      await this.delay(this.speed);
    }
    
    // When typing finishes, trigger the parsing animation
    this.onComplete?.();
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

And those macro numbers that count up from 0? People love that:

```javascript
function animateCounter(element, start, end, duration = 1000, suffix = '') {
  const range = end - start;
  const increment = range / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= end) {
      element.textContent = Math.round(end) + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current) + suffix;
    }
  }, 16);
}

// Watch those calories count up: 0... 150... 400... 620!
animateCounter(document.querySelector('.calories'), 0, 620, 1500, ' cal');
```

## Performance: Making It Instant

Here's the thing about interactive demos - they need to feel instant. Nobody wants to wait for calculations when they're playing with scaling factors. So we pre-compute common scenarios and cache everything:

```javascript
// For our demo, we pre-calculate common scaling scenarios
const DEMO_DATA = {
  grilled_chicken_salad: {
    base_servings: 2,
    ingredients: [
      {
        id: "chicken-breast",
        base: { quantity: 2, weight: 400, macros: { calories: 620, protein: 116, carbs: 0, fat: 14 }},
        scaled: {
          1: { quantity: 1, weight: 200, macros: { calories: 310, protein: 58, carbs: 0, fat: 7 }},
          3: { quantity: 3, weight: 600, macros: { calories: 930, protein: 174, carbs: 0, fat: 21 }},
          4: { quantity: 4, weight: 800, macros: { calories: 1240, protein: 232, carbs: 0, fat: 28 }}
        }
      }
      // Pre-computed for instant response
    ]
  }
};
```

For the full app, we'll use a proper caching system, but for the demo, pre-computation gives us that instant response that makes people go "wow."

## Error Handling: When Things Go Wrong

Real-world recipe parsing isn't perfect. Sometimes the AI misses something, or someone inputs something weird. We plan for this:

```javascript
function parseIngredient(text) {
  try {
    const parsed = this.aiParser.parse(text);
    return this.validateIngredient(parsed);
  } catch (error) {
    // Graceful fallback to simpler parsing
    return this.fallbackParser.parse(text);
  }
}

function validateIngredient(ingredient) {
  // Sanity checks that catch obvious errors
  if (!ingredient.name || !ingredient.quantity) {
    throw new Error('Invalid ingredient format');
  }
  
  if (ingredient.quantity < 0 || ingredient.quantity > 1000) {
    throw new Error('Unrealistic quantity - probably a parsing error');
  }
  
  return ingredient;
}
```

The key is failing gracefully. If our smart parsing doesn't work, we fall back to simpler methods. If someone tries to scale a recipe by 100x, we politely suggest that might not be what they intended.

## The Component Architecture

All of this comes together in a clean component structure that's actually maintainable:

```astro
// components/RecipeDemo.astro - the main orchestrator
---
import IngredientsList from './IngredientsList.astro';
import NutritionSummary from './NutritionSummary.astro';
import ScalingInterface from './ScalingInterface.astro';

export interface Props {
  recipeData: RecipeData;
  showPremiumTeasers?: boolean;
}

const { recipeData, showPremiumTeasers = true } = Astro.props;
---

<section class="recipe-demo" data-recipe-id={recipeData.id}>
  <!-- Input section with typewriter effect -->
  <div class="input-section">
    <div class="recipe-input" data-text={recipeData.originalText}></div>
  </div>
  
  <!-- AI processing animation -->
  <div class="processing-section">
    <div class="ai-indicator">AI</div>
    <div class="parsing-dots">Parsing...</div>
  </div>
  
  <!-- Results with tabbed interface -->
  <div class="results-section">
    <!-- Tabs and content areas -->
  </div>
</section>
```

Each component handles its own concerns, but they all work together through a central state management system that keeps everything in sync.

## What This All Achieves

By the time we're done building this, we'll have created something that feels like magic to users but is actually solid engineering underneath. Professional-grade calculations delivered through a consumer-friendly interface.

The technical foundation is robust enough to handle real-world complexity, but the user experience is smooth enough that people actually enjoy using it. That's the sweet spot where great products live.

---

*Next: Check out [Smart Scaling System](./smart-scaling.md) for the detailed rounding algorithms, or jump to [Implementation Plan](./implementation-plan.md) to see how we build this step by step.* 