const BaseRepository = require('../base.repository');
const LoginModel = require('./login.model');

class LoginRepository extends BaseRepository {
	constructor() {
		super(LoginModel);
	}
}

module.exports = new LoginRepository();