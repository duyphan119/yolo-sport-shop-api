const cartController = require("../controllers/cartController");

const router = require("express").Router();
router.get("/user/:id", cartController.getByUser);
router.post("/", cartController.addToCart);
router.put("/user/:id/delete/product/:productId", cartController.removeItem);
router.delete("/:id", cartController.deleteOne);
module.exports = router;
