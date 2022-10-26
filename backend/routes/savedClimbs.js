const express = require("express");
const router = express.Router();
const savedClimbsController = require("../controllers/savedClimbsController");
const authMiddleware = require("../middleware/auth");

//* MONGO COLLECTION CONNECT
router.get("/:id", savedClimbsController.getSavedClimbs);
router.post("/add", savedClimbsController.saveOneClimb);
router.delete("/:id", savedClimbsController.deleteSavedClimb);

module.exports = router;
