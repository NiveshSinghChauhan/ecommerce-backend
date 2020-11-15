const router = require('express').Router();

const productRoutes = require('./product');
const orderRoutes = require('./order');
const cartItemRoutes = require('./cart-item');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart-items', cartItemRoutes);

module.exports = router;
