const Recipe = require('../recipeModel');

async function getRecipes(req, res, next) {
  try {
    const filtered = await Recipe.getAllRecipes(req.query,req.user.id);
    if (!filtered.length) return res.status(404).json({ success: false, message: 'No recipes found' });
    res.status(200).json({ success: true, recipes: filtered });
  } catch (err) {
    next(err);
  }
}

async function getRecipe(req, res, next) {
  try {

    console.log(req.user.id);

    const recipe = await Recipe.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.status(200).json({ success: true, recipe });
  } catch (err) {
    next(err);
  }
}

async function createRecipe(req, res, next) {
  try {
    const newRecipe = await Recipe.createRecipe(req.body,req.user.id);
    res.status(201).json({ success: true, recipe: newRecipe });
  } catch (err) {
    next(err);
  }
}

async function updateRecipe(req, res, next) {
  try {
    const updated = await Recipe.updateRecipe(req.params.id, req.body,req.user.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.status(200).json({ success: true, recipe: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const deleted = await Recipe.deleteRecipe(req.params.id,req.user.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.status(200).json({ success: true, message: 'Recipe deleted' });
  } catch (err) {
    next(err);
  }
}

async function getStats(req, res, next) {
  try {
    const stats = await Recipe.getStats();
    res.status(200).json({ success: true, ...stats });
  } catch (err) {
    next(err);
  }
}

module.exports = { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, getStats };
