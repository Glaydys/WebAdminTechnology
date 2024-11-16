const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'  
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            _id: false,  
        },
    ]
});

let Cart = mongoose.model('Cart', cartSchema, 'carts');
module.exports = Cart;