const { model, Schema } = require('mongoose');


const schema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const cartItemModel = model('cartItem', schema, 'cartItems');


module.exports = cartItemModel;