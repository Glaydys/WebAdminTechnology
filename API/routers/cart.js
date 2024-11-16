const express = require('express');
const Cart = require('../Model/cart');
const router = express.Router();
const mongoose = require('mongoose');


//thêm sp vào giỏ hàng
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    try {

        let cart = await Cart.findById(userId);
        if (!cart) {
            cart = new Cart({ _id: userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex(
            (item) => item.productId.toHexString() === productId.toString(),
        );

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity
        } else {
            cart.products.push({
                productId,
                quantity,
            })
        }

        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

//tìm người dùng (giỏ hàng của userId đó)
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findById(userId)
            .populate({
                path: 'products.productId',
                model: 'Product',
            })

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);  
        return res.status(500).json({ error: 'Error fetching cart' });
    }
});

//cập nhật số lượng của giỏ hàng
router.post('/update', async (req, res) => {
    const { userId, products } = req.body;
    console.log("Request data:", { userId, products }); 

    try {
        let cart = await Cart.findOne({ _id: userId });
        if (!cart) {
            cart = new Cart({ _id: userId, products });
        } else {
            products.forEach((newProduct) => {
                const productIndex = cart.products.findIndex(p => p.productId.toString() === newProduct.productId);
                if (productIndex === -1) {
                    cart.products.push(newProduct);
                } else {
                    cart.products[productIndex].quantity = newProduct.quantity;
                }
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error updating cart:", error); // Log lỗi server
        res.status(500).json({ message: 'Error updating cart', error });
    }
});

//xóa sp
router.delete('/:productId/:userId', async (req, res) => {
    const { productId, userId } = req.params;
    console.log('productId:', productId);
    console.log('userId:', userId);
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'userId không hợp lệ' });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        const result = await Cart.updateOne(
            { _id: userId },
            { $pull: { products: { productId: productId } } }  
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Sản phẩm không tìm thấy trong giỏ hàng' });
        }

        res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong khi xóa sản phẩm' });
    }
});



module.exports = router;
