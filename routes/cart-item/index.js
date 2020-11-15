const router = require('express').Router();

const { Types } = require('mongoose');
const CartItemModel = require('../../models/cart-item');

router.get('/', async (req, res) => {
    try {
        const { _id: customer_id } = req.AUTH;

        const cartItems = await CartItemModel.find({ customer_id }).exec();

        res.status(200).json({ products: cartItems, customer_id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})


router.delete('/', async (req, res) => {
    try {
        const { _id: customer_id } = req.AUTH;

        await CartItemModel.deleteMany({ customer_id }).exec();

        res.status(201).json({ customer_id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

router.post('/create', async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const { _id: customer_id } = req.AUTH;

        const newCartItem = {
            _id: new Types.ObjectId(),
            customer_id,
            product_id,
            quantity,
            timestamp: new Date().toISOString()
        }

        await CartItemModel.updateOne({ product_id: { $ne: product_id } }, {
            $setOnInsert: newCartItem
        }).exec();

        res.status(201).json({
            cart_id: newCartItem._id,
            timestamp: newCartItem.timestamp
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})

router.delete('/cart_item_id', async (req, res) => {
    try {
        const { cart_item_id } = req.params;

        await CartItemModel.deleteOne({ _id: cart_item_id }).exec();

        res.status(201).json({ cart_item_id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: error.message });
    }
})


module.exports = router;
