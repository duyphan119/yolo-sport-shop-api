const categoryController = require("../controllers/categoryController");

const router = require("express").Router();
router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.createOne);
router.put("/:id", categoryController.updateOne);
router.delete("/:id", categoryController.deleteOne);
module.exports = router;
