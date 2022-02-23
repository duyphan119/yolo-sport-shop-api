const router = require("express").Router();
const authController = require("../controllers/authController");
router.post("/register", authController.register);
router.post("/login", authController.logIn);
router.post("/logout", authController.logOut);
router.post("/refresh", authController.refresh);
module.exports = router;
