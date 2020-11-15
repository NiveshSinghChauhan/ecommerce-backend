const router = require('express').Router();
const ProductModel = require('../../models/product');


router.post('/', async (req, res) => {
    try {
        const productData = req.body;

        const createdProduct = await new ProductModel(productData).save();

        res.status(201).json({
            product_id: createdProduct._id,
            timestamp: createdProduct.timestamp
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const { projection } = req.query;

        const products = await ProductModel.aggregate([
            {
                $match: {}
            },
            {
                $project: projection.reduce((acc, curr) => Object.assign(acc, { [curr]: 1 }), { _id: 1 })
            }
        ]).exec();

        res.status(200).json({ products: products.data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})


module.exports = router;
