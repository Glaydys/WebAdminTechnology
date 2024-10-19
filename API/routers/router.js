// router.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../Model/product.js');

const router = express.Router();

// Cấu hình để sử dụng thư mục public cho ảnh tĩnh
router.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

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

// POST: Thêm sản phẩm
router.post('/FormAddProduct/alert', upload.single('image_product'), async (req, res) => {
  const { product_id, category_id, name_product, description, price, quantity } = req.body;
  const image_product = req.file;

  if (!image_product) {
    return res.send('Vui lòng tải lên một hình ảnh.');
  }

  const newProduct = new Product({
    product_id,
    category_id,
    name_product,
    description,
    price,
    quantity,
    image_product: '/uploads/' + image_product.filename,
  });

  try {
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi thêm sản phẩm!');
  }
});

// Xuất router và upload
module.exports = { router, upload };
