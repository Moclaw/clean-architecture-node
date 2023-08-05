
const jwt = require('jsonwebtoken');
const UserRepository = require('../../../domain/user/user.repository');
const LoginRepository = require('../../../domain/login/login.repository');

async function authorize(req, res, next) {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		const tokenInfo = await LoginRepository.findByKey('token', token);
		if (!tokenInfo || !tokenInfo.isActive) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const user = await UserRepository.findById(decodedToken.id);
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		req.userId = user._id;
		req.role = user.role;
		req.tokenId = tokenInfo.id;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized', data: error });
	}
}

module.exports = authorize;
