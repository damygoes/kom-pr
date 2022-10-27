const express = require("express");
const router = express.Router();
const seedingController = require("../controllers/seedingController");

router.post("/", seedingController.seedClimbs);

module.exports = router;
