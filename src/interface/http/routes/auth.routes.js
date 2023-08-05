const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authorize');

// Route: POST /api/auth/login
// Description: User login
router.post('/login', UserController.login);

// Route: GET /api/auth/current-user
// Description: Get current user
router.get('/current-user', authMiddleware, UserController.getCurrentUser);

// Route: POST /api/auth/refresh-token
// Description: Refresh token
router.post('/refresh-token', UserController.refreshToken);

// Route: POST /api/auth/logout
// Description: Logout
router.get('/logout', authMiddleware, UserController.logout);



module.exports = router;
