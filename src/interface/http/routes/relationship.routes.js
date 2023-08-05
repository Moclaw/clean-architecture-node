const express = require('express');
const router = express.Router();
const RelationshipController = require('../controllers/relationship.controller');

// Route: GET /api/relationships
// Description: Get all relationships
router.get('/', RelationshipController.getAll);

// Route: GET /api/relationships/:id
// Description: Get relationship by id
router.get('/:id', RelationshipController.getById);

// Route: GET /api/relationships/user/:userId
// Description: Get relationship by userId
router.get('/user/:userId', RelationshipController.getRelationshipByUserId);

module.exports = router;
