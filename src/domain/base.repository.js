const { model } = require('mongoose');

class BaseRepository {
	constructor(model) {
		// Kiểm tra model hợp lệ
		if (!model) {
			throw new Error('Model is required');
		}
		this.model = model;
	}

	async findAll() {
		try {
			return this.model.find();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findByKey(key, value) {
		try {
			return this.model.findOne({ [key]: value });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async findById(id) {
		try {
			return this.model.findById(id);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async create(data) {
		try {
			return this.model.create(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async update(id, data) {
		try {
			return this.model.findByIdAndUpdate(id, data, { new: true });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async updateMany(filter, data) {
		try {
			return this.model.updateMany(filter, data, { new: true });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async updateByKey(key, value, data) {
		try {
			return this.model.findOneAndUpdate({ [key]: value }, data, { new: true });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async updateByListKeys(nameKey, keys, values, data) {
		try {
			if (nameKey.length !== keys.length || keys.length !== values.length) {
				throw new Error('The length of nameKey, keys, and values arrays must be the same.');
			}

			const filter = {};
			for (let i = 0; i < keys.length; i++) {
				filter[nameKey[i]] = keys[i];
			}

			return this.model.updateMany(filter, data, { new: true });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async delete(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

module.exports = BaseRepository;
