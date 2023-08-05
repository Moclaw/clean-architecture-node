const mongoose = require('mongoose');
const userLoginSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
		unqiue: true,
	},
	tokenExpiration: {
		type: Date,
		required: true,
	},

	ipAddress: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
		default: true,
	},
	logoutDate: {
		type: Date,
	},
	loginDate: {
		type: Date,
		required: true,
	},
});

const UserLoginModel = mongoose.model('UserLogin', userLoginSchema);
module.exports = UserLoginModel;