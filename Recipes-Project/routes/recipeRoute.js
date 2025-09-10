const express = require('express');
const recipeRoute = express.Router();
const { validation, validationPut } = require('../middlewares/validation');
const recipeController = require('../controllers/recipeController');

recipeRoute.get('/', recipeController.getRecipes);
recipeRoute.get('/stats', recipeController.getStats);
recipeRoute.get('/:id', recipeController.getRecipe);

recipeRoute.post('/', validation, recipeController.createRecipe);
recipeRoute.put('/:id', recipeController.updateRecipe);
recipeRoute.delete('/:id', recipeController.deleteRecipe);

module.exports = recipeRoute;
