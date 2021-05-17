import { runPuzzles } from '../../utils.js';

function part1(input) {
  const allergensMap = new Map();
  const allIngredientsMap = new Map();
  for (const line of input) {
    const match = line.match(/(.*) \(contains (.*)\)/);
    const ingredients = match[1].split(' ');
    for (const ingredient of ingredients) {
      let ingredientsCount = allIngredientsMap.get(ingredient);
      if (!ingredientsCount) {
        ingredientsCount = 0;
      }
      allIngredientsMap.set(ingredient, ingredientsCount + 1);
    }
    const allergens = match[2].split(', ');
    for (const allergen of allergens) {
      if (!allergensMap.has(allergen)) {
        allergensMap.set(allergen, new Map());
      }
      const ingredientsMap = allergensMap.get(allergen);
      for (const ingredient of ingredients) {
        let ingredientsCount = ingredientsMap.get(ingredient);
        if (!ingredientsCount) {
          ingredientsCount = 0;
        }
        ingredientsMap.set(ingredient, ingredientsCount + 1);
      }
    }
  }

  const finalAllergensMap = new Map();

  while (allergensMap.size > 0) {
    let maxAllergensCount = 0;
    let maxAllergen, maxIngredient;
    for (const [allergen, ingredientsMap] of [...allergensMap.entries()]) {
      for (const [ingredient, allergensCount] of [
        ...ingredientsMap.entries(),
      ]) {
        if (
          allergensCount > maxAllergensCount &&
          allIngredientsMap.has(ingredient)
        ) {
          maxAllergensCount = allergensCount;
          maxAllergen = allergen;
          maxIngredient = ingredient;
        }
      }
    }
    if (maxAllergensCount == 0) {
      break;
    }
    finalAllergensMap.set(maxAllergen, maxIngredient);
    allergensMap.delete(maxAllergen);
    allIngredientsMap.delete(maxIngredient);
  }

  return [...allIngredientsMap.values()].reduce((acc, cur) => acc + cur);
}

function part2(input) {
  const allergensToIngredientsMap = new Map();
  const ingredientsToAllergensMap = new Map();
  const allIngredientsMap = new Map();
  const allAllergensMap = new Map();
  for (const line of input) {
    const match = line.match(/(.*) \(contains (.*)\)/);
    const ingredients = match[1].split(' ');
    const allergens = match[2].split(', ');
    for (const ingredient of ingredients) {
      let ingredientsCount = allIngredientsMap.get(ingredient);
      if (!ingredientsCount) {
        ingredientsCount = 0;
      }
      allIngredientsMap.set(ingredient, ingredientsCount + 1);

      let allergensInIngredient = ingredientsToAllergensMap.get(ingredient);
      if (!allergensInIngredient) {
        ingredientsToAllergensMap.set(ingredient, new Set(allergens));
      } else {
        const intersected = intersection(
          allergensInIngredient,
          new Set(allergens),
        );
        ingredientsToAllergensMap.set(ingredient, intersected);
      }
    }
    for (const allergen of allergens) {
      let allergensCount = allAllergensMap.get(allergen);
      if (!allergensCount) {
        allergensCount = 0;
      }
      allAllergensMap.set(allergen, allergensCount + 1);
      if (!allergensToIngredientsMap.has(allergen)) {
        allergensToIngredientsMap.set(allergen, new Map());
      }
      const ingredientsMap = allergensToIngredientsMap.get(allergen);
      for (const ingredient of ingredients) {
        let ingredientsCount = ingredientsMap.get(ingredient);
        if (!ingredientsCount) {
          ingredientsCount = 0;
        }
        ingredientsMap.set(ingredient, ingredientsCount + 1);
      }
    }
  }

  const finalAllergensMap = new Map();

  for (const [allergen, ingredientsMap] of [
    ...allergensToIngredientsMap.entries(),
  ]) {
    const ingredients = [...ingredientsMap.entries()]
      .filter(([, count]) => count === allAllergensMap.get(allergen))
      .map(([ingredient]) => ingredient);
    finalAllergensMap.set(allergen, ingredients);
  }

  const sortedFinalAllergens = [...finalAllergensMap.entries()].sort((a, b) =>
    a[0] > b[0] ? 1 : -1,
  );

  const result = findIngredientsForAllergens(sortedFinalAllergens);

  return result.map(x => x[1]).join(',');
}

function intersection(setA, setB) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function findIngredientsForAllergens(allergens, chosenAllergens = []) {
  if (!allergens.length) {
    return chosenAllergens;
  }

  const [allergen, ingredients] = allergens[0];
  for (const ingredient of ingredients.filter(
    i =>
      chosenAllergens.filter(([, chosenIngredient]) => chosenIngredient === i)
        .length === 0,
  )) {
    const result = findIngredientsForAllergens(allergens.slice(1), [
      ...chosenAllergens,
      [allergen, ingredient],
    ]);
    if (result) {
      return result;
    }
  }

  return;
}

runPuzzles(part1, part2, 2020, 21);
