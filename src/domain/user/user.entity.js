const BaseEntity = require('./base.entity');

class User extends BaseEntity {
	constructor(data) {
		super(data);
		// Define additional properties specific to the User entity if needed
	}
}

module.exports = User;
