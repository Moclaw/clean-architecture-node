const BaseRepository = require('../base.repository');
const RequestModel = require('./request.model');

class RequestRepository extends BaseRepository {
	constructor() {
		super(RequestModel);
	}

	async getRequestByTitle(title) {
		return await this.findByKey('title', title);
	}
}
