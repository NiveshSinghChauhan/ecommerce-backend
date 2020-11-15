const { model, Schema } = require('mongoose');


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: string,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const customerModel = model('customer', schema, 'customers');


module.exports = customerModel;