const RelationshipRepository = require('../../domain/relationship/relationship.repository');
const getCurrentTimeUTC = require('../../infrastructure/utils/util');

class RelationshipService {

	async getAll() {
		try {
			const relationships = await RelationshipRepository.getAll();
			return relationships;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

	async getById(id) {

		try {
			const relationship = await RelationshipRepository.getById(id);
			if (!relationship) {
				return { message: 'Không tìm thấy relationship', status: 404 };
			}
			return relationship;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

	async getRelationshipByUserId(userId) {
		try {
			const relationship = await RelationshipRepository.getRelationshipByUserId(userId);
			if (!relationship) {
				return { message: 'Không tìm thấy relationship', status: 404 };
			}
			return relationship;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

	async create(data) {
		try {
			const relationship = await RelationshipRepository.create(data);
			return relationship;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

	async update(id, data) {
		try {
			const relationship = await RelationshipRepository.update(id, data);
			return relationship;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

	async delete(id) {
		try {
			const relationship = await RelationshipRepository.delete(id);
			return relationship;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}
}

module.exports = new RelationshipService();

