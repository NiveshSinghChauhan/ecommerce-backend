const { model, Schema } = require('mongoose');


const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
    },
    selling_price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    },
    description: {
        type: String,
        required: true
    },
    specification: {
        type: Array,
    },
    seller: {
        type: {
            shop_name: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                required: true,
                default: Date.now()
            },
        },
        required: true
    }
})

const productModel = model('product', schema, 'products');


module.exports = productModel;