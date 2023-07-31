// user.entity.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Định nghĩa schema của người dùng (user)
const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	// Thêm các thuộc tính khác của người dùng (user) (nếu có)
});

// Tạo model `User` dựa trên schema đã định nghĩa
const User = mongoose.model('User', userSchema);

// Export model `User` để sử dụng trong file user.repository.js
module.exports = User;
