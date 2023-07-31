const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to the MongoDB database.');
	} catch (error) {
		console.error('Error connecting to the database:', error.message);
		process.exit(1); // Exit the application if the database connection fails
	}
};

module.exports = connectDB;
