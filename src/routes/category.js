const categoryController = require("../controllers/categoryController");
const { verifyToken_Admin } = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", verifyToken_Admin, categoryController.createOne);
router.put("/:id", verifyToken_Admin, categoryController.updateOne);
router.delete("/:id", verifyToken_Admin, categoryController.deleteOne);
module.exports = router;
