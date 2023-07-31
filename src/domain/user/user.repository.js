// user.repository.js

const mongoose = require('mongoose');
const User = require('./user.entity');

class UserRepository {
	constructor() {
		this.UserModel = User
	}

}

module.exports = UserRepository;
