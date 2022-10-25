const express = require("express");
const router = express.Router();
const savedClimbsController = require("../controllers/savedClimbsController");
const authMiddleware = require("../middleware/auth");

//* MONGO COLLECTION CONNECT
router.get("/", savedClimbsController.getSavedClimbs);
router.post("/add", savedClimbsController.saveOneClimb);
router.delete("/:id", authMiddleware, savedClimbsController.deleteSavedClimb);

module.exports = router;
