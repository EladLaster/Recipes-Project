const express = require('express');
const { v4: uuidv4 } = require('uuid');
const recipeRoute = express.Router();
const recipes = require('../DB/fakeDB');
const { validation, validationPut } = require('../middlewares/validation');

recipeRoute.get('/', (req, res) => {
  let filteredRecipes = [...recipes];

  const { difficulty, maxCookingTime, search } = req.query;

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

  if (filteredRecipes.length === 0) {
    return res.status(404).json({ success: false, message: 'No recipes found' });
  }

  res.status(200).json({ success: true, recipes: filteredRecipes });
});

recipeRoute.get('/stats',(req,res) => {
  const totalNumOfRecipes = recipes.length;
  
  const averageCookingTime =
  recipes.reduce((sum, r) => sum + r.cookingTime, 0) / (totalNumOfRecipes || 1);

  const recipesByDifficulty = recipes.reduce((acc, r) => {
    const level = r.difficulty.toLowerCase();
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});
  
  const ingredientCount = {};
  recipes.forEach(r => {
    r.ingredients.forEach(ing => {
      ingredientCount[ing] = (ingredientCount[ing] || 0) + 1;
    });
  });

  const mostCommonIngredients = Object.entries(ingredientCount)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  res.status(200).json({
    success: true,
    totalNumOfRecipes,
    averageCookingTime,
    recipesByDifficulty,
    mostCommonIngredients
  });
});

recipeRoute.get('/:id',(req,res) => {
    const recipeId = req.params.id;
    const recipe = recipes.find(r => r.id === recipeId )
    if(recipe)
        res.status(200).json({ success: true, recipe });
    else
        return res.status(404).json({ success: false, message: 'Recipe not found' });
})


recipeRoute.post("/",validation,(req,res)=>{
    const { title, description, ingredients, instructions, cookingTime, servings, difficulty, rating } = req.body;
    
    if (!title || !description || !ingredients || !instructions || !cookingTime || !servings || !difficulty) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const newRecipe = {
    id: uuidv4(),
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    rating: rating || 0,
    createdAt: new Date().toISOString()
  };
    recipes.push(newRecipe);
    res.status(201).json({ success: true, recipe: newRecipe });
})

recipeRoute.put('/:id',validationPut,(req,res) => {
  const recipeId = req.params.id;
  const recipeIndex = recipes.findIndex(r => r.id === recipeId);

  if (recipeIndex === -1) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }

  const updatedRecipe = {
    ...recipes[recipeIndex],
    ...req.body,
    id: recipeId,
    createdAt: recipes[recipeIndex].createdAt
  };

  recipes[recipeIndex] = updatedRecipe;

  res.status(200).json({ success: true, recipe: updatedRecipe });
});

recipeRoute.delete("/:id",(req,res) => {
  const recipeId = req.params.id;
  const recipeIndex = recipes.findIndex(r => r.id === recipeId);

  if (recipeIndex === -1) {
    return res.status(404).json({ success: false, message: 'Recipe not found' });
  }

  recipes.splice(recipeIndex,1);
  res.status(204).send();
})

module.exports = recipeRoute;
