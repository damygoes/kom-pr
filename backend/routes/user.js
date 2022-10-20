const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.addNewUser);
router.post("/login", userController.logInUser);
router.patch("/:id", userController.updateUserInfo);
router.delete("/:id", userController.deleteUser);

module.exports = router;
