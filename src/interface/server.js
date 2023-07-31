const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDef = require('../infrastructure/swagger/swagger');
const path = require('path');
const glob = require('glob');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Import database configuration
const connectDB = require('../infrastructure/database/db.config');

// Middleware for parsing JSON and URL-encoded data
app.use(
	OpenApiValidator.middleware({
		apiSpec: '../../api.yaml',
		validateRequests: true,
		validateResponses: true,
	}),
);
app.use((err, req, res, next) => {
	// format errors
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
});
// Import all routes format api/filename/*.routes.js
const routeFiles = glob.sync(path.join(__dirname, '../interface/http/routes/*.routes.js'));

routeFiles.forEach((routeFile) => {
	const group = path.basename(routeFile, '.routes.js');
	const router = require(routeFile);
	app.use('/api/' + group, router);
});

// Define routes for the application
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDef));

// Socket.IO event handling
io.on('connection', (socket) => {
	console.log('A client has connected.');

	// Handle new chat messages from clients
	socket.on('chatMessage', (message) => {
		console.log('Client sent a chat message:', message);
		io.emit('newChatMessage', message); // Broadcast the message to all connected clients
	});

	// Handle client disconnection
	socket.on('disconnect', () => {
		console.log('A client has disconnected.');
	});
});

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB()
	.then(() => {
		// Start the server after successful database connection
		server.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}.`);
		});
	})
	.catch((error) => {
		console.error('Error connecting to the database:', error.message);
		process.exit(1);
	});
