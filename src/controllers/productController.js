const Product = require("../models/Product");
const productController = {
  // Tạo 1 product
  createOne: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy 1 product theo _id
  getById: async (req, res) => {
    try {
      const product = await Product.findById({ _id: req.params.id });
      res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy tất cả product
  getAll: async (req, res) => {
    try {
      const page = req.query.p ? req.query.p : 1;
      const productsInAPage = 12;
      const skip = productsInAPage * (page - 1);
      const products = await Product.find().skip(skip).limit(productsInAPage);
      res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Cập nhật product
  updateOne: async (req, res) => {
    try {
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json("Updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy tất cả product
  deleteOne: async (req, res) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json("Delete product successful");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = productController;
