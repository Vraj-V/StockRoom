const mongoose = require('mongoose');
const Product = require('../schema/ProductMst');

const validateId = (id) => mongoose.Types.ObjectId.isValid(id);

const normalizeProduct = (body = {}) => ({
	name: typeof body.name === 'string' ? body.name.trim() : body.name,
	price: body.price === '' || body.price === undefined ? body.price : Number(body.price),
	discount: body.discount === '' || body.discount === undefined ? 0 : Number(body.discount),
	categories: Array.isArray(body.categories)
		? body.categories.map((category) => String(category).trim()).filter(Boolean)
		: String(body.categories || '').split(',').map((category) => category.trim()).filter(Boolean),
	description: typeof body.description === 'string' ? body.description.trim() : body.description,
});

const listProducts = async (req, res) => {
	try {
		const products = await Product.find().sort({ createdAt: -1 });
		return res.json(products);
	} catch (error) {
		return res.status(500).json({ message: 'Unable to list products', error: error.message });
	}
};

const createProduct = async (req, res) => {
		console.log(req.headers['content-type'], req.body);

	try {
		const product = await Product.create(normalizeProduct(req.body));
		return res.status(201).json(product);
	} catch (error) {
		return res.status(400).json({ message: 'Invalid product data', error: error.message });
	}
};

const getProductById = async (req, res) => {
	try {
		if (!validateId(req.params.id)) return res.status(400).json({ message: 'Invalid product id' });
		const product = await Product.findById(req.params.id);
		if (!product) return res.status(404).json({ message: 'Product not found' });
		return res.json(product);
	} catch (error) {
		return res.status(500).json({ message: 'Unable to get product', error: error.message });
	}
};

const updateProductById = async (req, res) => {
	try {
		if (!validateId(req.params.id)) return res.status(400).json({ message: 'Invalid product id' });
		const product = await Product.findByIdAndUpdate(req.params.id, normalizeProduct(req.body), {
			new: true,
			runValidators: true,
		});
		if (!product) return res.status(404).json({ message: 'Product not found' });
		return res.json(product);
	} catch (error) {
		return res.status(400).json({ message: 'Invalid product data', error: error.message });
	}
};

const deleteProductById = async (req, res) => {
	try {
		if (!validateId(req.params.id)) return res.status(400).json({ message: 'Invalid product id' });
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) return res.status(404).json({ message: 'Product not found' });
		return res.json({ message: 'Product deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to delete product', error: error.message });
	}
};

module.exports = {
	listProducts,
	createProduct,
	getProductById,
	updateProductById,
	deleteProductById,
};
