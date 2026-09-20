const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/UserMst');

const createToken = (userId) =>
	jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'name, email and password are required' });
		}

		if (password.length < 6) {
			return res.status(400).json({ message: 'Password must be at least 6 characters' });
		}

		const normalizedEmail = email.toLowerCase().trim();
		const existingUser = await User.findOne({ email: normalizedEmail });
		if (existingUser) {
			return res.status(409).json({ message: 'Email is already registered' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({ name, email: normalizedEmail, password: hashedPassword });

		return res.status(201).json({
			message: 'Signup successful',
			token: createToken(user._id),
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		return res.status(500).json({ message: 'Unable to sign up', error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email?.toLowerCase().trim() }).select('+password');

		if (!user || !(await bcrypt.compare(password || '', user.password))) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		return res.json({
			message: 'Login successful',
			token: createToken(user._id),
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (error) {
		return res.status(500).json({ message: 'Unable to log in', error: error.message });
	}
};

const logout = (req, res) => res.json({ message: 'Logout successful' });

const protect = (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization || !authorization.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'Bearer token is required' });
		}

		const token = authorization.split(' ')[1];
		req.user = jwt.verify(token, process.env.JWT_SECRET);
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};

module.exports = { signup, login, logout, protect };
