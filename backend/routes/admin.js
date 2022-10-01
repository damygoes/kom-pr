const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/login", adminController.logInAdmin);
router.post("/admin/create", adminController.addAdmin);

module.exports = router;
