const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},

	role: {
		type: String,
		required: true,
		enum: ['user', 'admin'],
		default: 'user',
	},
});

// Create the UserModel from the schema
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
