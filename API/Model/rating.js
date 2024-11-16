const mongoose = require('mongoose')
const rateSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    users: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            rate: {
                type: Number,          
            },
            createdAt: { type: Date },
            _id: false,
        }
    ],
    rate: Number
})

exports.Rate = mongoose.model('Rate', rateSchema, 'rates')