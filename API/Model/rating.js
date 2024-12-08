const mongoose = require('mongoose')
const rateSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    users: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            comment: {
                type: String 
            },
            rate: {
                type: Number, 
                required: true,
                min: 1,
                max: 5
            },
            createdAt: {
                type: Date, 
                default: Date.now
            }
        }
    ],
    rate: {
        type: Number, 
        default: 0
    }
});

exports.Rate = mongoose.model('Rate', rateSchema, 'rates')
