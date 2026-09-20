const express = require('express');
const { protect } = require('../controllers/Auth_cntrl');
const {
	listProducts,
	createProduct,
	getProductById,
	updateProductById,
	deleteProductById,
} = require('../controllers/Product_cntrl');

const router = express.Router();

router.use(protect);
router.get('/', listProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

module.exports = router;
