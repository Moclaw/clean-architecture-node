const UserRepository = require('../../domain/user/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginRepository = require('../../domain/login/login.repository');
const { logout } = require('../../interface/http/controllers/user.controller');
const getCurrentTimeUTC = require('../../infrastructure/utils/util');

class UserService {
	async login(username, password, ip) {
		try {
			const user = await UserRepository.getUserByUsername(username);
			if (!user) {
				{
					const newUser = await UserRepository.create({
						username,
						password: bcrypt.hashSync(password, 10),
						role: 'user',
					});
					const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
						expiresIn: 86400 // expires in 24 hours
					});
					const date = getCurrentTimeUTC();
					await LoginRepository.create({
						userId: newUser._id,
						token: token,
						ipAddress: ip,
						loginDate: new Date(date),
						tokenExpiration: new Date(date + 7 * 24 * 60 * 60 * 1000)
					});
					const data = { user: newUser, token };
					data.user.password = undefined;
					return data;
				}
			} else {
				const passwordIsValid = bcrypt.compareSync(password, user.password);
				if (!passwordIsValid) {
					return { message: 'Mật khẩu không đúng', status: 400 };
				}
				const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
					expiresIn: 86400 // expires in 24 hours
				});
				const data = { user, token };
				const date = getCurrentTimeUTC();
				await LoginRepository.create({
					userId: data.user._id,
					token: token,
					ipAddress: ip,
					loginDate: new Date(date),
					tokenExpiration: new Date(date + 7 * 24 * 60 * 60 * 1000)
				});
				data.user.password = undefined;
				return data;
			}
		} catch (error) {
			return { message: 'Lỗi hệ thống', status: 500 };
		}
	}

	async logout(userId) {
		const date = getCurrentTimeUTC();
		const result = await LoginRepository.updateMany({ userId: userId }, { isActive: false, logoutDate: new Date(date) });
		return result;
	}
	async generateRefreshToken(userId, ip) {
		const payload = {
			userId: userId,
			// Thời gian hết hạn, bạn có thể tuỳ chỉnh thời gian hết hạn theo ý muốn
			// Ví dụ: thời gian hết hạn sau 30 ngày: expiresIn: '30d'
			// Thời gian hết hạn sau 1 giờ: expiresIn: '1h'
			expiresIn: '7d', // Thời gian hết hạn sau 7 ngày
		};

		// Tạo refresh token bằng jwt.sign và trả về token đã tạo
		const refreshToken = jwt.sign(payload, process.env.JWT_SECRET);
		const date = getCurrentTimeUTC();
		await LoginRepository.create({
			userId: userId,
			token: refreshToken,
			ipAddress: ip,
			tokenExpiration: new Date(date + 7 * 24 * 60 * 60 * 1000)
		});

		return refreshToken;
	}

	async getRefreshToken(refreshToken) {
		// Kiểm tra xem refreshToken có hợp lệ hay không?
		const refreshTokenDoc = await LoginRepository.findOne({ token: refreshToken });
		if (!refreshTokenDoc || !refreshTokenDoc.isActive) {
			return null;
		}
		return refreshTokenDoc;
	}

}

module.exports = new UserService();
