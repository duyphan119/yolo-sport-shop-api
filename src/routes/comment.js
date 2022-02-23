const commentController = require("../controllers/commentController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/product/:id", commentController.getByProduct);
router.post("/", verifyToken, commentController.createOne);
router.put("/:id", verifyToken, commentController.updateOne);
router.delete("/:id", verifyToken, commentController.deleteOne);
module.exports = router;
