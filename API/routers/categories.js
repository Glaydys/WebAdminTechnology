const express = require("express")
const Category = require("../Model/category")
const app = express.Router()
const multer = require('multer');
const path = require('path');

// Cấu hình để sử dụng thư mục public cho ảnh tĩnh
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Cấu hình multer để lưu file vào thư mục public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads')); // Lưu vào thư mục public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Đặt tên file với timestamp
  },
});

const upload = multer({ storage: storage });


app.post('/add', upload.single('image_category'), async (req,res)=>{
    const { category_id, name_category } = req.body
    const image_category = req.file
  
    if (!image_category) {
        return res.send('Vui lòng tải lên một hình ảnh.');
    }
      
    const newCategory = new Category({
        category_id,
        name_category,
        image_category: '/uploads/' + image_category.filename
    });

    try {
        await newCategory.save()
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json(error)
    }
})
  

module.exports = app