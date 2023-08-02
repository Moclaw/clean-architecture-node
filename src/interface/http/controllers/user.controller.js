const userService = require('../../../application/user/user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../../domain/user/user.repository');



class AuthController {
	async login(req, res, next) {
		const { username, password } = req.body;

		try {
			const user = await userService.getUserByUsername(username);
			if (!user) {
				{
					const newUser = await UserRepository.create({
						username,
						password: bcrypt.hashSync(password, 10),
						role: 'user'
					});
					const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
						expiresIn: 86400 // expires in 24 hours
					});
					res.status(200).json({ token });
				}
			} else {
				const passwordIsValid = bcrypt.compareSync(password, user.password);
				if (!passwordIsValid) {
					return res.status(401).json({ message: 'Invalid password.' });
				}
				const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
					expiresIn: 86400 // expires in 24 hours
				});
				res.status(200).json({ token });
			}
		} catch (error) {
			res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.', error });
		}
	}
}

module.exports = new AuthController();
