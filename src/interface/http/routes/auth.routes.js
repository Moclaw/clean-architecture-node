const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const OpenApiValidator = require('express-openapi-validator');

// Define the schema for the request body
const loginSchema = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			format: 'email',
		},
		password: {
			type: 'string',
			minLength: 6,
		},
	},
	required: ['email', 'password'],
};

const openApiValidatorOptions = {
	apiSpec: '../../api.yaml',
	validateRequests: true,
	validateResponses: true,
}


// Add the schema to the route's handler function
router.post('/login', openApiValidatorOptions.middleware({ body: loginSchema }), authController.login);

module.exports = router;
