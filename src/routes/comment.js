const commentController = require("../controllers/commentController");

const router = require("express").Router();
router.get("/product/:id", commentController.getByProduct);
// router.get("/:id", commentController.getById);
router.post("/", commentController.createOne);
router.put("/:id", commentController.updateOne);
router.delete("/:id", commentController.deleteOne);
module.exports = router;
