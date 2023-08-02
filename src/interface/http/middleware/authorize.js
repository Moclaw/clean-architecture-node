const { expressJwt } = require('express-jwt');
const UserRepository = require('../../../../domain/user/user.repository');

module.exports = authorize;

function authorize() {
	return [
		// Authenticate JWT token and attach decoded token to request as req.user
		expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),

		// Attach full user record to request object
		async (req, res, next) => {
			try {
				// Get user with id from token 'sub' (subject) property
				const user = await UserRepository.findById(req.user.sub);

				// Check if the user still exists
				if (!user) {
					return res.status(401).json({ message: 'Unauthorized' });
				}

				// Authorization successful
				req.user = user.get();
				next();
			} catch (error) {
				// Handle any error that may occur during database operations or authentication
				res.status(401).json({ message: 'Unauthorized' });
			}
		},
	];
}
