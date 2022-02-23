const Cart = require("../models/Cart");
const cartController = {
  // Thêm giỏ hàng
  addToCart: async (req, res) => {
    try {
      const { productId, quantity, size } = req.body;
      const userCart = await Cart.findOne({ userId: req.user._id });
      if (userCart) {
        const { items } = userCart;
        const index = items.findIndex(
          (item) => item.productId === productId && item.size === size
        );
        if (index === -1) {
          //Nếu sản phẩm này chưa có trong giỏ hàng
          await Cart.updateOne(
            { _id: userCart._id },
            {
              $push: {
                items: {
                  productId: productId,
                  quantity: quantity,
                  size: size,
                },
              },
            }
          );
        } else {
          //Nếu sản phẩm này đã có trong giỏ hàng
          await Cart.updateOne(
            {
              _id: userCart._id,
              "items.productId": productId,
              "items.size": size,
            },
            {
              $set: {
                "items.$.quantity": quantity + userCart.items[index].quantity,
              },
            }
          );
        }
      } else {
        // Nếu người dùng chưa tạo giỏ hàng
        const newCart = new Cart({
          items: [{ productId, quantity, size }],
          userId: req.user._id,
        });
        await newCart.save();
      }
      res.status(200).json("Added");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Lấy giỏ hàng theo user
  getByUser: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.id });
      res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Xoá tất cả sản phẩm trong giỏ hàng
  deleteOne: async (req, res) => {
    try {
      await Cart.updateOne({ _id: req.params.id }, { items: [] });
      res.status(200).json("Deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //Xoá 1 sản phẩm khỏi giỏ hàng
  removeItem: async (req, res) => {
    try {
      await Cart.updateOne(
        { userId: req.params.id },
        {
          $pull: {
            items: {
              productId: req.body.productId,
              size: req.body.size,
            },
          },
        }
      );
      res.status(200).json("Removed");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = cartController;
