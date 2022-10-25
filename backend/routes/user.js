const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

router.post("/create", userController.addNewUser);
router.post("/login", userController.logInUser);
router.patch("/:id", authMiddleware, userController.updateUserInfo);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
