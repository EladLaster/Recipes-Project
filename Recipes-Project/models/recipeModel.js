const { v4: uuidv4 } = require('uuid');
const { readRecipes, writeRecipes } = require('../data/DataPersistence');
// const recipes = require('../DB/fakeDB');

async function getAllRecipes(filters = {}) {
  const recipes = await readRecipes();
  let filteredRecipes =  [...recipes];
  const { difficulty, maxCookingTime, search } = filters;

  if (difficulty) {
    filteredRecipes = filteredRecipes.filter(
      r => r.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  if (maxCookingTime) {
    const maxTime = parseInt(maxCookingTime, 10);
    if (!isNaN(maxTime)) {
      filteredRecipes = filteredRecipes.filter(r => r.cookingTime <= maxTime);
    }
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredRecipes = filteredRecipes.filter(
      r =>
        r.title.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower)
    );
  }

  return filteredRecipes;
}

async function getRecipeById(id) {
  const recipes = await readRecipes();
  return recipes.find(r => r.id === id);
}

async function createRecipe(data) {
  const recipes = await readRecipes();
  const newRecipe = { id: uuidv4(),...data, createdAt: new Date().toISOString() };
  recipes.push(newRecipe);
  await writeRecipes(recipes);
  return newRecipe;
}

async function updateRecipe(id, data) {
  const recipes = await readRecipes();
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return null;

  const updated = { ...recipes[index], ...data, id, createdAt: recipes[index].createdAt };
  recipes[index] = updated;
  await writeRecipes(recipes);
  return updated;
}

async function deleteRecipe(id) {
  const recipes = await readRecipes();
  const index = recipes.findIndex(r => r.id === id);
  if (index === -1) return false;

  recipes.splice(index, 1);
  await writeRecipes(recipes);
  return true;
}

async function getStats() {
  const recipes = await readRecipes();
  const totalNumOfRecipes = recipes.length;
  const averageCookingTime = recipes.reduce((sum, r) => sum + r.cookingTime, 0) / (totalNumOfRecipes || 1);

  const recipesByDifficulty = recipes.reduce((acc, r) => {
    const level = r.difficulty.toLowerCase();
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  const ingredientCount = {};
  recipes.forEach(r => r.ingredients.forEach(ing => ingredientCount[ing] = (ingredientCount[ing] || 0) + 1));
  const mostCommonIngredients = Object.entries(ingredientCount).sort((a,b) => b[1]-a[1]).map(e => e[0]);

  return { totalNumOfRecipes, averageCookingTime, recipesByDifficulty, mostCommonIngredients };
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getStats
};
