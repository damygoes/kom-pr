const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.logInAdmin);
router.post("/create", adminController.addAdmin);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
