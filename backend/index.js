require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./route/ProductRoute');
const { signup, login, logout } = require('./controllers/Auth_cntrl');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Product API is running' }));
app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.use('/api/products', productRoutes);

app.use((error, req, res, next) => {
	if (error instanceof SyntaxError && error.status === 400 && error.body) {
		return res.status(400).json({ message: 'Invalid JSON body' });
	}
	return res.status(500).json({ message: 'Internal server error' });
});

const startServer = async () => {
	try {
		await connectDB();
		const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
		server.on('error', (error) => {
			if (error.code === 'EADDRINUSE') {
				console.error(`Port ${PORT} is already in use. Stop the existing backend process before starting another one.`);
				process.exit(1);
			}
			throw error;
		});
	} catch (error) {
		console.error(`Startup failed: ${error.message}`);
		process.exit(1);
	}
};

startServer();
