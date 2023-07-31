// Import dependencies
const UserService = require('../../../application/user/user.service'); // Đường dẫn tùy chỉnh dựa vào cấu trúc thư mục

// Khởi tạo UserService
const userService = new UserService();

// Controller xử lý yêu cầu đăng nhập

const login = async (req, res, next) => {
	try {
		const { email, password } = req.openapi.params;
		next
		const token = await userService.login(email, password);

		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
	}
};

// Controller xử lý yêu cầu đăng ký tài khoản
const register = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		await userService.register(email, password, name);
		res.status(201).json({ message: 'Tài khoản đã được đăng ký thành công.' });
	} catch (error) {
		res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
	}
};


const hello = async (req, res) => {
	try {
		console.log('hello');
		res.status(200).json({ message: 'Hello' });
	} catch (error) {
		res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
	}
};

// Export các controllers để sử dụng trong file auth.routes.js
module.exports = {
	login,
	register,
	hello
};
