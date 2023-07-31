// example-generator.js

function generateRequestBodyExample(schemaBody) {
	const requestBodyExample = {};

	// Check if schemaBody is an object literal
	if (typeof schemaBody === 'object' && !Array.isArray(schemaBody)) {
		for (const key in schemaBody) {
			requestBodyExample[key] = getExampleValue(schemaBody[key]);
		}
	}

	return requestBodyExample;
}

function getExampleValue(type) {
	// Define example values for different types
	switch (type) {
		case 'string':
			return 'example-string';
		case 'number':
			return 123;
		case 'boolean':
			return true;
		case 'array':
			return [];
		case 'object':
			return {};
		// Add more cases as needed for different types
		default:
			return null;
	}
}

module.exports = { generateRequestBodyExample };
