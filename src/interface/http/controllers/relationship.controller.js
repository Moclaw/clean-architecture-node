const relationshipService = require('../../../application/relationship/relationship.service');

class RelationshipController {

	async getAll(req, res, next) {
		try {
			const relationships = await relationshipService.getAll();
			res.status(200).json({ data: relationships, message: 'Lấy danh sách relationship thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async getById(req, res, next) {
		try {
			const relationship = await relationshipService.getById(req.params.id);
			if (!relationship) {
				return res.status(404).json({ message: 'Không tìm thấy relationship' });
			}
			res.status(200).json({ data: relationship, message: 'Lấy relationship thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async getRelationshipByUserId(req, res, next) {
		try {
			const relationship = await relationshipService.getRelationshipByUserId(req.params.userId);
			if (!relationship) {
				return res.status(404).json({ message: 'Không tìm thấy relationship' });
			}
			res.status(200).json({ data: relationship, message: 'Lấy relationship thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async create(req, res, next) {
		try {
			const relationship = await relationshipService.create(req.body);
			res.status(200).json({ data: relationship, message: 'Tạo relationship thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async update(req, res, next) {
		try {
			const relationship = await relationshipService.update(req.params.id, req.body);
			if (!relationship) {
				return res.status(404).json({ message: 'Không tìm thấy relationship' });
			}
			res.status(200).json({ data: relationship, message: 'Cập nhật relationship thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}
}

module.exports = new RelationshipController();