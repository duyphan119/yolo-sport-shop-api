const Comment = require("../models/Comment");
const Product = require("../models/Product");

const commentController = {
  createOne: async (req, res) => {
    try {
      const comment = new Comment(req.body);
      const savedComment = await comment.save();
      await Product.updateOne(
        { _id: req.body.productId },
        {
          $push: {
            comments: [comment._id],
          },
        }
      );
      res.status(200).json(savedComment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteOne: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete({ _id: req.params.id });
      await Product.updateOne(
        { _id: comment.productId },
        {
          $pull: {
            comments: comment._id,
          },
        }
      );
      res.status(200).json("Deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getByProduct: async (req, res) => {
    try {
      const comments = await Comment.find({ productId: req.params.id });
      res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateOne: async (req, res) => {
    try {
      await Comment.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json("Updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = commentController;
