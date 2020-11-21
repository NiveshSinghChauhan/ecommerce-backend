const router = require('express').Router();

const productRoutes = require('./product');
const orderRoutes = require('./order');
const cartItemRoutes = require('./cart-item');
const authorization = require('../middleware/authorization');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart-items', authorization, cartItemRoutes);

module.exports = router;
