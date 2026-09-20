const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		discount: {
			type: Number,
			default: 0,
			min: 0,
			max: 100,
		},
		categories: {
			type: [String],
			default: [],
		},
		description: {
			type: String,
			trim: true,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
