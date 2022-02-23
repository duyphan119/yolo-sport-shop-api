const productController = require("../controllers/productController");

const router = require("express").Router();
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", productController.createOne);
router.put("/:id", productController.updateOne);
router.delete("/:id", productController.deleteOne);
module.exports = router;
