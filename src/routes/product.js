const productController = require("../controllers/productController");
const { verifyToken_Admin } = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", verifyToken_Admin, productController.createOne);
router.put("/:id", verifyToken_Admin, productController.updateOne);
router.delete("/:id", verifyToken_Admin, productController.deleteOne);
module.exports = router;
