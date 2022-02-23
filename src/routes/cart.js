const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/user/:id", verifyToken, cartController.getByUser);
router.post("/", verifyToken, cartController.addToCart);
router.put(
  "/user/:id/delete/product/:productId",
  verifyToken,
  cartController.removeItem
);
router.delete("/:id", verifyToken, cartController.deleteOne);
module.exports = router;
