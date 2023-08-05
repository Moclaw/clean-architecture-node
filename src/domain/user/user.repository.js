const BaseRepository = require('../base.repository');
const UserModel = require('./user.model');

class UserRepository extends BaseRepository {
	constructor() {
		super(UserModel);
	}

	async getUserByUsername(username) {
		return await this.findByKey('username', username);
	}
}

module.exports = new UserRepository();
