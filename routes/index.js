const router = require('express').Router();

const productRoutes = require('./product');
const orderRoutes = require('./order');


router.use('/products', productRoutes);
router.use('/orders', orderRoutes);


module.exports = router;
