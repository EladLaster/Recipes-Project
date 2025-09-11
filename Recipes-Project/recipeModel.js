const { v4: uuidv4 } = require('uuid');
const db = require('./models');
const { Recipe, User, UserFavorites } = db;
// const recipes = require('../DB/fakeDB');
// const { readRecipes, writeRecipes } = require('../data/DataPersistence');


async function getAllRecipes(filters = {},userId) {
  // const recipes = await readRecipes();

  const { difficulty, maxCookingTime, search } = filters;

  const whereClause = {
    ...(userId && { userId }),
    ...(difficulty && { difficulty }),
    ...(maxCookingTime && { cookingTime: { [Op.lte]: Number(maxCookingTime) } }),
  };

  let filteredRecipes = await Recipe.findAll({ where: whereClause });

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
  // const recipes = await readRecipes();

  const recipe = await Recipe.findAll({where:{id}});

  if (recipe.length === 0) return null;

  return {
    ...recipe[0].toJSON(),
    ingredients: JSON.parse(recipe[0].ingredients || '[]'),
    instructions: JSON.parse(recipe[0].instructions || '[]')
  };
}

async function createRecipe(data, userId) {
  // const recipes = await readRecipes();
  // const newRecipe = { id: uuidv4(),...data, createdAt: new Date().toISOString() };
  // recipes.push(newRecipe);
  // await writeRecipes(recipes);

  const newRecipe = await Recipe.create({
  id: uuidv4(),
  ...data,
  userId,
  ingredients: JSON.stringify(data.ingredients || []),
  instructions: JSON.stringify(data.instructions || [])
});

  if (!newRecipe) {
    throw new Error("Failed to create recipe");
  }

  return {
    ...newRecipe.toJSON(),
    ingredients: JSON.parse(newRecipe.ingredients || '[]'),
    instructions: JSON.parse(newRecipe.instructions || '[]')
  };
}

async function updateRecipe(id, data,userId) {
  // const recipes = await readRecipes();
  // const index = recipes.findIndex(r => r.id === id);
  // if (index === -1) return null;
  // const updated = { ...recipes[index], ...data, id, createdAt: recipes[index].createdAt };
  // recipes[index] = updated;
  // await writeRecipes(recipes);

  const recipe = await Recipe.findAll({where : {id}});

  if (recipe.length === 0) return null;

  if (recipe[0].userId !== userId) {
    throw new Error("You are not authorized to update this recipe");
  }

  const updated = await recipe[0].update(data);

  return {
    ...updated.toJSON(),
    userId,
    ingredients: JSON.parse(updated.ingredients || '[]'),
    instructions: JSON.parse(updated.instructions || '[]')
  };
  // return updated;
}

async function deleteRecipe(id,userId) {
  // const recipes = await readRecipes();
  // const index = recipes.findIndex(r => r.id === id);
  // if (index === -1) return false;
  // recipes.splice(index, 1);
  // await writeRecipes(recipes);

  const recipe = await Recipe.findAll({where:{id}});

  if(recipe.length === 0) return null;

  if (recipe[0].userId !== userId) {
    throw new Error("You are not authorized to delete this recipe");
  }

  await recipe[0].destroy();

  return true;
}

async function getStats() {
  // const recipesJSON = await readRecipes();

  const recipes = await Recipe.findAll();

   const recipesJSON = recipes.map(r => ({
    ...r.toJSON(),
    ingredients: JSON.parse(r.ingredients || '[]'),
    instructions: JSON.parse(r.instructions || '[]')
  }));

  const totalNumOfRecipes = recipesJSON.length;
  const averageCookingTime = (recipesJSON.reduce((sum, r) => sum + r.cookingTime, 0) / (totalNumOfRecipes || 1)).toFixed(2);

  const recipesByDifficulty = recipesJSON.reduce((acc, r) => {
    const level = r.difficulty.toLowerCase();
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  const ingredientCount = {};
  recipesJSON.forEach(r => r.ingredients.forEach(ing => ingredientCount[ing] = (ingredientCount[ing] || 0) + 1));
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
