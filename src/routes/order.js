const orderController = require("../controllers/orderController");

const router = require("express").Router();
router.post("/", orderController.createOne)
router.put("/:id", orderController.updateOne)
router.delete("/:id", orderController.deleteOne)
module.exports = router;