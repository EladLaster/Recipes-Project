const express = require('express');
const recipeRoute = express.Router();
const { validation, validationPut } = require('../middlewares/validation');
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authentication');
const checkRecipeOwnership = require('../middlewares/recipeOwnership');

recipeRoute.get('/',authMiddleware, recipeController.getRecipes);
recipeRoute.get('/stats', recipeController.getStats);
recipeRoute.get('/:id', recipeController.getRecipe);

recipeRoute.post('/',authMiddleware,validation, recipeController.createRecipe);
recipeRoute.put('/:id',authMiddleware,checkRecipeOwnership, recipeController.updateRecipe);
recipeRoute.delete('/:id',authMiddleware,checkRecipeOwnership, recipeController.deleteRecipe);

module.exports = recipeRoute;
