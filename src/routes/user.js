const userController = require("../controllers/userController");
const { verifyToken_Admin } = require("../middlewares/authMiddleware");

const router = require("express").Router();
router.get("/", verifyToken_Admin, userController.getAll);
router.get("/:id", verifyToken_Admin, userController.getById);
router.post("/", verifyToken_Admin, userController.createOne);
router.put("/:id", verifyToken_Admin, userController.updateOne);
router.delete("/:id", verifyToken_Admin, userController.deleteOne);
module.exports = router;
