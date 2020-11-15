const router = require('express').Router();

const OrderModel = require('../../models/order');
const ProductModel = require('../../models/product');
const { route } = require('../product');

router.get('/create', async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const { _id: customer_id } = req.AUTH;

        // getting the product that is ordered
        const product = await ProductModel.findOne({ _id: product_id }).select('selling_price stock name').exec();

        // checking the if product is in stock or not
        if (product.stock === 0) {
            res.status(400).json({ errorMessage: 'Product out of stock' });
            return;
        } else if (product.stock < quantity) {
            res.status(400).json({ errorMessage: 'Stock of the product is not sufficient to fullfill the order' });
            return;
        }

        // creating the order
        const createdOrder = await new OrderModel({
            customer_id,
            shipping: 10,
            currency: 'INR',
            status: 'processing',
            product: {
                product_id,
                name: product.name,
                price: product.selling_price,
                quantity
            }
        }).save();

        // updating the stock of the product
        await ProductModel.updateOne({ _id: product_id }, { $inc: { stock: (-1 * quantity) } }).exec();

        res.status(201).json({
            order_id: createdOrder._id,
            timestamp: createdOrder.timestamp
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

router.patch('/status',async (req, res) => {

})

module.exports = router;
