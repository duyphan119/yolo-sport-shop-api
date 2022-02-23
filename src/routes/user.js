const userController = require("../controllers/userController");

const router = require("express").Router();
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.createOne);
router.put("/:id", userController.updateOne);
router.delete("/:id", userController.deleteOne);
module.exports = router;
