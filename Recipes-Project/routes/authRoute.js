const express = require('express');
const authRoute = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authentication');

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login);
authRoute.get('/profile', authMiddleware, authController.profile);

module.exports = authRoute;
