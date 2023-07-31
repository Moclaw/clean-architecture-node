// Import dependencies
const UserRepository = require('../../domain/user/user.repository'); // Đường dẫn tùy chỉnh dựa vào cấu trúc thư mục
const bcrypt = require('bcrypt');

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	// Xử lý logic đăng nhập
	async login(email, password) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new Error('Email không tồn tại.');
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error('Mật khẩu không đúng.');
		}

		// Trả về thông tin của user hoặc token (tuỳ thuộc vào logic của ứng dụng)
		return { id: user.id, email: user.email, name: user.name };
	}

	// Xử lý logic đăng ký tài khoản
	async register(email, password, name) {
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new Error('Email đã tồn tại.');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = {
			email: email,
			password: hashedPassword,
			name: name,
		};

		// Thêm user mới vào cơ sở dữ liệu
		await this.userRepository.create(user);
	}
}

module.exports = UserService;
