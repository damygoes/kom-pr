const express = require("express");
const router = express.Router();
const savedClimbsController = require("../controllers/savedClimbsController");
const passportAuth = require("../middleware/jwtAuth");

//* MONGO COLLECTION CONNECT
router.get("/", passportAuth, savedClimbsController.getSavedClimbs);
router.post("/add", passportAuth, savedClimbsController.saveOneClimb);
router.delete("/:id", passportAuth, savedClimbsController.deleteSavedClimb);

module.exports = router;
