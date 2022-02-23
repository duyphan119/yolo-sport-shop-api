const bcrypt = require("bcryptjs");
const User = require("../models/User");
const userController = {
  // Tạo 1 user
  createOne: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(500).json("This email was available");
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);
      const { password, ...others } = req.body;
      const newUser = new User({ ...others, hash: hashPassword });
      const savedUser = await newUser.save();
      const { hash, ...resUser } = savedUser._doc;
      res.status(200).json(resUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy 1 user theo _id
  getById: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      const { hash, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy tất cả user
  getAll: async (req, res) => {
    try {
      const users = await User.find();
      const resUsers = users.map((item) => {
        const { hash, ...others } = item._doc ? item._doc : item;
        return others;
      });
      res.status(200).json(resUsers);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Cập nhật user
  updateOne: async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json("Updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy tất cả user
  deleteOne: async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json("Delete user successful");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = userController;
