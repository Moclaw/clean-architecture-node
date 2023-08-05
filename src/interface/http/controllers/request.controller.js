const requestService = require('../../../application/request/request.service');

class RequestController {

	async getAll(req, res, next) {
		try {
			const requests = await requestService.getAll();
			res.status(200).json({ data: requests, message: 'Lấy danh sách request thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async getById(req, res, next) {
		try {
			const request = await requestService.getById(req.params.id);
			if (!request) {
				return res.status(404).json({ message: 'Không tìm thấy request' });
			}
			res.status(200).json({ data: request, message: 'Lấy request thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}
}

module.exports = new RequestController();