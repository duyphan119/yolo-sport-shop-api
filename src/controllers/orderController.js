const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const orderController = {
  // Tạo 1 đơn hàng
  createOne: async (req, res) => {
    try {
      const {  items } = req.body;

      const cart = await Cart.findOne({ userId: req.user._id });
      const cartItems = cart.items;
      for (let i = 0; i < items.length; i++) {
        const index = cartItems.findIndex((cartItem) => {
          return (
            cartItem.productId === items[i].productId &&
            cartItem.size === items[i].size
          );
        });
        if (index === -1) {
          return res.status(500).json("You can't create this order");
        } else {
          (async () => {
            await Cart.updateOne(
              {
                _id: cart._id,
                "items.productId": items[i].productId,
                "items.size": items[i].size,
              },
              {
                $set: {
                  "items.$.quantity":
                    cartItems[index].quantity - items[i].quantity,
                },
              }
            );
            await Product.updateOne(
              { _id: items[i].productId, "inventory.size": items[i].size },
              {
                $inc: {
                  "inventory.$.count": -items[i].quantity,
                },
              }
            );
          })();
        }
      }
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Cập nhật order
  updateOne: async (req, res) => {
    try {
      if (
        !req.body.status ||
        req.body.status === -1 ||
        req.body.status === 0 ||
        req.body.status === 1
      ) {
        await Order.updateOne({ _id: req.params.id }, req.body);
        res.status(200).json("Updated");
      } else {
        return res.status(500).json("You can't update this order");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Huỷ đơn hàng
  deleteOne: async (req, res) => {
    try {
      const order = await Order.findById({ _id: req.params.id });
      if (order.status === -1) {
        order.items.forEach((item) => {
          (async () => {
            await Cart.updateOne(
              {
                userId: order.userId,
                "items.productId": item.productId,
                "items.size": item.size,
              },
              {
                $inc: {
                  "items.$.quantity": item.quantity,
                },
              }
            );
            await Product.updateOne(
              { _id: item.productId, "inventory.size": item.size },
              {
                $inc: {
                  "inventory.$.count": item.quantity,
                },
              }
            );
          })();
        });

        // Nếu đơn hàng này chưa giải quyết thì mới được xoá
        await Order.deleteOne({ _id: req.params.id });
        res.status(200).json("Deleted");
      } else {
        return res.status(500).json("You can't delete this order");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = orderController;
