const { model, Schema } = require('mongoose');


const schema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    shipping: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'processing'
    },
    currency: {
        type: String,
        required: true,
        default: 'INR'
    },
    product: {
        type: {
            product_id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        },
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const orderModel = model('order', schema, 'orders');


module.exports = orderModel;