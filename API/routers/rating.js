const express = require("express")
const mongoose = require('mongoose')
const { Rate } = require("../Model/rating")
const router = express.Router()
const Product = require("../Model/product")

// them rate
router.post('/add', async (req,res)=>{
    const { productId, userId, rate} = req.body
    try {
        let danhgia = await Rate.findById(productId)
        if(!danhgia){
            danhgia = new Rate({_id: productId, users: [] })
        }

        //tim user trong bang danh gia
        const existingProductIndex = danhgia.users.findIndex(
            (item) => item.userId.toHexString() === userId,
        )

        if(existingProductIndex !== -1){
            danhgia.users[existingProductIndex].rate = rate
            danhgia.users[existingProductIndex].createdAt = Date.now()
        }else{
            danhgia.users.push({
                userId,
                rate,
                createdAt: Date.now()
            })            
        }

        // tinh tong rate
        const { users } = danhgia;        
        const totalRates = users.reduce((sum, user) => sum + user.rate, 0); // su dung reduce de tinh tong rate
        const averageRate = users.length > 0 ? (totalRates / users.length) : 0;

        const rate_averageRate = averageRate.toFixed(2)
        const userlenght = users.length

        await Rate.findByIdAndUpdate(productId, {rate: rate_averageRate})
        await Product.findByIdAndUpdate(productId, {rate: rate_averageRate, totalUserRate: userlenght})        

        await danhgia.save()
        return res.status(200).json({
            ...danhgia._doc,
            rate: rate_averageRate,
            total: userlenght
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Error rate"            
        })
    }
})


module.exports = router