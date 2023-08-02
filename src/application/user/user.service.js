const UserRepository = require('../../domain/user/user.repository');

class UserService {
	async login(username, password) {
		try {

		} catch (error) {
			throw new Error('Error fetching user from the database.');
		}
	}
	async getUserByUsername(username) {
		try {
			const user = await UserRepository.getUserByUsername(username);
			return user;
		} catch (error) {
			throw new Error('Error fetching user from the database.');
		}
	}

}

module.exports = new UserService();
