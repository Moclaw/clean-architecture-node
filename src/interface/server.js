const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDef = require('../infrastructure/swagger/swagger');
const path = require('path');
const glob = require('glob');
const errorHandler = require('./http/middleware/error-handler');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Import middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);


// Import database configuration
const connectDB = require('../infrastructure/database/db.config');

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
