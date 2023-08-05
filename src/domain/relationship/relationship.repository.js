const BaseRepository = require('../base.repository');
const RelationshipModel = require('./relationship.model');

class RelationshipRepository extends BaseRepository {
	constructor() {
		super(RelationshipModel);
	}

	async getRelationshipByUserId(userId) {
		return await this.findByKey('userId', userId);
	}
}
