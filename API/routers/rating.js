const express = require("express")
const mongoose = require('mongoose')
const { Rate } = require("../Model/rating")
const router = express.Router()
const Product = require("../Model/product")

// Thêm đánh giá và bình luận
router.post("/add-rate-comment", async (req, res) => {
    const { productId, userId, rate, comment } = req.body;

    try {
        let danhgia = await Rate.findById(productId);
        if (!danhgia) {
            danhgia = new Rate({ _id: productId, users: [] });
        }

        // Cập nhật đánh giá của người dùng
        const existingUserIndex = danhgia.users.findIndex(
            (item) => item.userId.toString() === userId
        );

        if (existingUserIndex !== -1) {
            danhgia.users[existingUserIndex].rate = rate;
            danhgia.users[existingUserIndex].comment = comment; // Cập nhật bình luận
            danhgia.users[existingUserIndex].createdAt = Date.now();
        } else {
            danhgia.users.push({
                userId,
                rate,
                comment, // Thêm bình luận
                createdAt: Date.now(),
            });
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
});

// Lấy danh sách bình luận, điểm trung bình và tổng số bình luận
router.get("/comment/:productId", async (req, res) => {
    const { productId } = req.params;

    try {
        const danhgia = await Rate.findById(productId).populate("users.userId", "username");

        if (!danhgia) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json({
            averageRate: danhgia.rate,
            totalComments: danhgia.users.length,
            comments: danhgia.users.map(user => ({
                userId: user.userId?._id, // Kiểm tra null trước khi lấy giá trị
                username: user.userId?.username || "Anonymous",
                comment: user.comment,
                rate: user.rate,
                createdAt: user.createdAt
            })),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error fetching comments and rate" });
    }
});

router.delete("/comment/:productId/:userId", async (req, res) => {
    const { productId, userId } = req.params;

    try {
        
        // Tìm đánh giá theo sản phẩm
        const danhgia = await Rate.findById(productId);
        if (!danhgia) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Lọc bỏ đánh giá của userId
        const newUsersList = danhgia.users.filter((user) => user.userId.toString() !== userId);

        if (newUsersList.length === danhgia.users.length) {
            return res.status(404).json({ error: "User comment not found" });
        }

        // Cập nhật danh sách người dùng
        danhgia.users = newUsersList;

        // Cập nhật điểm đánh giá trung bình
        const totalRates = danhgia.users.reduce((sum, user) => sum + user.rate, 0);
        const averageRate = danhgia.users.length > 0 ? (totalRates / danhgia.users.length).toFixed(2) : 0;

        danhgia.rate = averageRate;

        // Lưu thay đổi
        await danhgia.save();

        return res.status(200).json({
            message: "User comment and rate deleted successfully",
            remainingUsers: danhgia.users, // Danh sách đánh giá còn lại
            averageRate: danhgia.rate,
        });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ error: "Error deleting comment" });
    }
});

module.exports = router
