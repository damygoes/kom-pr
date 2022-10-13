const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.addNewUser);
router.post("/login", userController.logInUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
