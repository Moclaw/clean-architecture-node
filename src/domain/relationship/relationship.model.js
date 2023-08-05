const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationshipSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	followingId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	type: {
		type: String,
		enum: ['follow', 'friend', 'block', 'unfollow', 'lover'],
		default: 'follow',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
	}
});

module.exports = mongoose.model('Relationship', relationshipSchema);