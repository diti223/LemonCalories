# Smart Scaling: Making Recipe Math Actually Work

*Part of the [Enhanced Recipe Demo Documentation](./overview.md)*

## Why Most Recipe Scaling Sucks

You know what drives me crazy about recipe sites? You want to double a recipe and suddenly you need 3.75 eggs and 2.33 tablespoons of vanilla. Like, who has 3/4 of an egg lying around?

That's the problem we're solving. Our smart scaling system actually thinks about how real cooking works. No fractions where they don't belong, no measurements that make you want to throw your measuring spoons across the kitchen.

## The Philosophy: Cook Like a Human

Here's our core approach - we make scaling decisions based on how actual people cook, not just mindless math:

**Whole items stay whole.** 1.75 eggs becomes 2 eggs because nobody wants to deal with partial eggs.

**Different quantities need different precision.** A pinch of salt doesn't need the same precision as a pound of flour.

**Units matter.** Teaspoons work differently than cups, which work differently than pounds.

**Cooking logic wins.** If the math says 1.8 chicken breasts, we round to 2 because that's what makes sense in a real kitchen.

Let me show you how this actually works in practice.

## The Magic Behind the Scenes

Here's our core rounding algorithm that makes intelligent decisions:

```javascript
function smartRoundQuantity(value, unit, ingredientType = 'general') {
  // Rule #1: Whole items are always whole numbers
  if (unit === 'whole' || isWholeItem(ingredientType)) {
    return Math.round(value); // No 1.75 eggs!
  }
  
  // Rule #2: Different magnitudes get different precision
  if (value < 0.1) {
    return roundToNearest(value, 0.125); // 1/8 increments for tiny amounts
  } else if (value < 1) {
    return roundToNearest(value, 0.125); // Still 1/8 for small stuff
  } else if (value < 10) {
    return roundToNearest(value, 1); // Whole numbers for medium amounts
  } else if (value < 50) {
    return roundToNearest(value, value/10); // Gets smarter as numbers grow
  } else if (value < 100) {
    return roundToNearest(value, value/10); // Even smarter
  } else {
    return roundToNearest(value, 10); // Big increments for big numbers
  }
}
```

The beauty is in how it adapts. Small amounts like 0.37 teaspoons become 3/8 teaspoon (which you can actually measure). Large amounts like 87 grams become 90 grams (because who measures 87 grams exactly?).

## Real-World Examples That Make Sense

Let's say you have a recipe for 2 people and want to make it for 3. Here's what happens with some typical ingredients:

**2 eggs × 1.5 = 3 eggs** - Perfect! The math works out clean.

**1 cup milk × 1.5 = 1.5 cups** - Also perfect. 1½ cups is totally reasonable.

**2 tablespoons flour × 1.5 = 3 tablespoons** - Clean again.

**1 large chicken breast × 1.5 = 2 chicken breasts** - Here's where we get smart. 1.5 chicken breasts is stupid, so we round up to 2.

Now let's try scaling from 2 to 7 servings (×3.5 - a trickier case):

**2 tablespoons butter × 3.5 = 7 tablespoons** - The math works out perfectly.

**50g sugar × 3.5 = 175g** - Clean round number.

**0.5 teaspoon vanilla × 3.5 = 1.75 teaspoons** - This becomes 1¾ teaspoons, which is actually measurable with standard measuring spoons.

See how we balance mathematical accuracy with practical cooking reality?

## Unit-Specific Intelligence

Different units need different approaches because they work differently in real kitchens:

### Volume Measurements (teaspoons, tablespoons, cups)

For teaspoons and tablespoons, we use common fractions that correspond to actual measuring spoons. Most people have ¼ teaspoon, ½ teaspoon, etc., so we round to those increments.

For cups, we stick to standard fractions like ¼ cup, ⅓ cup, ½ cup because that's what measuring cups actually have marked on them.

### Weight Measurements (grams, ounces, pounds)

Small weights get rounded to reasonable increments - nobody measures 23.7 grams, but 25 grams makes perfect sense.

Large weights get bigger increments because precision matters less when you're dealing with pounds of ingredients.

## The Implementation That Makes It Work

Here's how we actually scale an entire ingredient while keeping everything sensible:

```javascript
function scaleIngredient(ingredient, scaleFactor) {
  // Step 1: Scale the weight (this gives us perfect macro calculations)
  const newWeight = ingredient.weightInGrams * scaleFactor;
  
  // Step 2: Scale the display quantity with smart rounding
  const rawQuantity = ingredient.quantity * scaleFactor;
  const smartQuantity = applySmartRounding(rawQuantity, ingredient.unit, ingredient.type);
  
  // Step 3: Recalculate nutrition based on the actual weight
  const newMacros = calculateMacros(ingredient.id, newWeight);
  
  return {
    ...ingredient,
    quantity: smartQuantity,
    weightInGrams: Math.round(newWeight),
    macros: newMacros
  };
}
```

The clever part is that we scale the weight (which ensures accurate nutrition calculations) but also scale the display quantity intelligently so the recipe still makes sense to cook from.

## Handling the Tricky Cases

### Tiny Quantities

When scaling results in something like 0.003 teaspoons of salt, we just say "pinch of salt" or mark it as optional. Nobody measures thousandths of teaspoons.

### Huge Quantities

When someone wants to scale a recipe for 50 people and ends up with 2,500g of flour, we automatically suggest converting to 2.5kg because that's way easier to work with.

### Fractional Display

Instead of showing "1.75 tablespoons," we convert to "1¾ tablespoons" because that's how real people think about measurements. We only use fractions that correspond to actual measuring tools.

```javascript
function convertToFraction(decimal) {
  const commonFractions = [
    { decimal: 0.125, fraction: "⅛" },
    { decimal: 0.25, fraction: "¼" },
    { decimal: 0.333, fraction: "⅓" },
    { decimal: 0.5, fraction: "½" },
    { decimal: 0.667, fraction: "⅔" },
    { decimal: 0.75, fraction: "¾" }
  ];
  
  // Find the closest match and use it
  // Otherwise just show the decimal
}
```

## The User Experience

From the user's perspective, this all happens instantly. They adjust the serving size slider and watch the ingredients update in real-time with sensible, cookable measurements.

The interface shows both the smart rounded quantity and the scaling factor, so people understand what's happening: "Scaling by 1.5x" with ingredients that make actual sense to cook with.

## Making Sure It Actually Works

We test this system with real recipes and real scaling scenarios. The edge cases we watch for:

**Extreme scaling factors** - Nobody should be able to scale a recipe by 100x and crash the system.

**Ingredient ratio preservation** - When we round a bunch of ingredients, do the flavors still work together?

**Measurement tool availability** - Can you actually measure what we're asking for with standard kitchen tools?

## Why This Matters

Every other recipe site just multiplies quantities and calls it done. We actually think about whether the result makes sense in a real kitchen.

That's the difference between a generic recipe converter and a tool that professional cooks would actually want to use. It's the attention to detail that makes people trust our calculations and want to upgrade to premium features.

The smart scaling isn't just a feature - it's proof that we understand cooking better than our competitors. And that understanding is what justifies charging for our service.

---

*Next up: [Data Structures](./data-structures.md) to see how we organize all this intelligence, or back to [Technical Implementation](./technical-implementation.md) for the calculation engine.* 