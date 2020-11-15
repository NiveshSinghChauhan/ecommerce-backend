const router = require('express').Router();

const productRoutes = require('./product');


router.use('/products', productRoutes);


module.exports = router;
