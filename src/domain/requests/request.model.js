const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,

	},
});

module.exports = mongoose.model('Request', requestSchema);
