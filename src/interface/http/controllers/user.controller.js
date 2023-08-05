const userService = require('../../../application/user/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../../domain/user/user.repository');
const loginRepository = require('../../../domain/login/login.repository');

class AuthController {
	async login(req, res, next) {
		const { username, password } = req.body;
		try {
			const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			const login = await userService.login(username, password, ip);

			if (login.status === 400) {
				return res.status(400).json({ message: login.message });
			}
			if (login.status === 500) {
				return res.status(500).json({ message: login.message });
			}
			res.status(200).json(login);
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async getCurrentUser(req, res, next) {
		try {

			const user = await UserRepository.findById(req.userId);
			if (!user) {
				return res.status(404).json({ message: 'Không tìm thấy user' });
			}
			res.status(200).json({ data: user, message: 'Lấy thông tin user thành công' });
		} catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async refreshToken(req, res, next) {
		try {
			const { refreshToken } = req.body;
			const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			const token = await userService.refreshToken(refreshToken, ip);
			if (token.status === 400) {
				return res.status(400).json({ message: token.message });
			}
			if (token.status === 500) {
				return res.status(500).json({ message: token.message });
			}
			res.status(200).json(token);
		}
		catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}

	async logout(req, res, next) {
		try {
			const logout = await userService.logout(req.tokenId);
			if (!logout)
				return res.status(404).json({ message: 'Không tìm thấy user' });
			res.status(200).json({ message: 'Đăng xuất thành công' });
		}
		catch (error) {
			res.status(500).json({ message: 'Lỗi hệ thống', data: error });
		}
	}
}
module.exports = new AuthController();
