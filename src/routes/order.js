const orderController = require("../controllers/orderController");
const {
  verifyToken,
  verifyToken_Admin,
} = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.post("/", verifyToken, orderController.createOne);
router.put("/:id", verifyToken_Admin, orderController.updateOne);
router.delete("/:id", verifyToken, orderController.deleteOne);
module.exports = router;
