const mongoose = require('mongoose');

let connecting = null;

const connectDB = async () => {
	const connectionString = process.env.DB_URL;
	if (!connectionString) throw new Error('DB_URL is not configured');

	if (mongoose.connection.readyState === 1) return;

	if (!connecting) {
		connecting = mongoose.connect(connectionString).catch((error) => {
			connecting = null;
			throw error;
		});
	}
	await connecting;
	console.log('MongoDB connected');
};

module.exports = connectDB;