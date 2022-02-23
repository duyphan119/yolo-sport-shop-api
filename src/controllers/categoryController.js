const Category = require("../models/Category");
const categoryController = {
  // Tạo 1 product
  createOne: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy 1 product theo _id
  getById: async (req, res) => {
    try {
      const category = await Category.findById({ _id: req.params.id });
      res.status(200).json(category);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy tất cả product
  getAll: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Cập nhật category
  updateOne: async (req, res) => {
    try {
      await Category.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json("Updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy tất cả category
  deleteOne: async (req, res) => {
    try {
      await Category.deleteOne({ _id: req.params.id });
      res.status(200).json("Deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = categoryController;
