const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const Joi = require('joi');

// Route: POST /api/auth/login
// Description: User login
router.post('/login', UserController.login);


module.exports = router;
