const mongoose = require('mongoose');

const connectDB = async () => {
	const connectionString = process.env.DB_URL;

	if (!connectionString) {
		throw new Error('DB_URL is not configured');
	}

	await mongoose.connect(connectionString);
	console.log('MongoDB connected');
};

module.exports = connectDB;
