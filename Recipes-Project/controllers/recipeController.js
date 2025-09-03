const Recipe = require('../models/recipeModel');

function getRecipes(req, res) {
  const filtered = Recipe.getAllRecipes(req.query);
  if (!filtered.length) return res.status(404).json({ success: false, message: 'No recipes found' });
  res.status(200).json({ success: true, recipes: filtered });
}

function getRecipe(req, res) {
  const recipe = Recipe.getRecipeById(req.params.id);
  if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
  res.status(200).json({ success: true, recipe });
}

function createRecipe(req, res) {
  const newRecipe = Recipe.createRecipe(req.body);
  res.status(201).json({ success: true, recipe: newRecipe });
}

function updateRecipe(req, res) {
  const updated = Recipe.updateRecipe(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Recipe not found' });
  res.status(200).json({ success: true, recipe: updated });
}

function deleteRecipe(req, res) {
  const deleted = Recipe.deleteRecipe(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, message: 'Recipe not found' });
  res.status(204).send();
}

function getStats(req, res) {
  const stats = Recipe.getStats();
  res.status(200).json({ success: true, ...stats });
}

module.exports = { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, getStats };
