const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const glob = require('glob');
const expressListEndpoints = require('express-list-endpoints');

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Nodejs API',
			description: 'Pet project for learning Nodejs',
			contact: {
				name: 'Moc Lam Developer',
			},
			servers: [
				{
					url: 'http://localhost:3000',
				},
			],
		},
		tags: [],
		components: {
			schemas: ['http', 'https'],
			securitySchemes: {
				JWT: {
					type: 'apiKey',
					in: 'header',
					name: 'Authorization',
					description: 'JWT Bearer token for authentication',
				},
			},
		},
		paths: {},
	},
	apis: ['../../interface/http/routes/*.routes.js'],
	security: [
		{
			JWT: [],
		},
	],
};

const routeFiles = glob.sync(path.join(__dirname, '../../interface/http/routes/*.routes.js'));

routeFiles.forEach((routeFile) => {
	const group = path.basename(routeFile, '.routes.js');
	const router = require(routeFile);
	options.swaggerDefinition.tags.push({
		name: group,
		description: group,
	});

	options.apis.push('./routes/' + group + '.js');
	options.swaggerDefinition.components.schemas[group] = router.schemas;
	const routes = expressListEndpoints(router);
	routes.forEach((item) => {
		if (!item.methods || item.methods.length === 0) {
			return; // Skip if item.methods is not defined or empty
		}

		const method = item.methods[0].toLowerCase();
		const pathName = item.path.replace(/:(\w+)/g, '{$1}');
		const path = '/' + group + pathName;

		if (!options.swaggerDefinition.paths[path]) {
			options.swaggerDefinition.paths[path] = {};
		}

		options.swaggerDefinition.paths[path][method] = {
			tags: [group],
			summary: item.path,
			parameters: [],
			responses: {
				200: {
					description: 'OK',
				},
				400: {
					description: 'Bad request',
				},
				401: {
					description: 'Unauthorized',
				},
				403: {
					description: 'Forbidden',
				},
				404: {
					description: 'Not found',
				},
				500: {
					description: 'Internal server error',
				},
			},
		};

		if (item.methods.includes('GET')) {
			const pathParams = item.path.match(/:(\w+)/g);
			if (pathParams) {
				pathParams.forEach((param) => {
					const paramName = param.substring(1);
					options.swaggerDefinition.paths[path][method].parameters.push({
						name: paramName,
						in: 'path',
						required: true,
						schema: {
							type: 'string', // You can update the schema type as needed
						},
					});
				});
			}
		} else {
			// For other methods (POST, PUT, DELETE), include the requestBody if schema.body exists
			if (item.methods.includes('POST') || item.methods.includes('PUT') || item.methods.includes('DELETE')) {
				if (item.schema && item.schema.body) {
					options.swaggerDefinition.paths[path][method].requestBody = {
						content: {
							'application/json': {
								schema: {
									type: 'object',
									properties: generateRequestBodyExample(item.schema.body), // Generate requestBodyExample
								},
							},
						},
					};
				}
			}
		}
	});
});

const specs = swaggerJsdoc(options);
module.exports = specs;