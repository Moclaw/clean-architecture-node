const RequestRepository = require('../../domain/requests/request.repository');
const getCurrentTimeUTC = require('../../infrastructure/utils/util');

class RequestService {

	async getAll() {
		try {
			const requests = await RequestRepository.getAll();
			return requests;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

	async getById(id) {

		try {
			const request = await RequestRepository.getById(id);
			if (!request) {
				return { message: 'Không tìm thấy request', status: 404 };
			}
			return request;
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

}
module.exports = new RequestService();