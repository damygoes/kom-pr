const express = require("express");
const router = express.Router();
const climbsController = require("../controllers/climbsController");
const authMiddleware = require("../middleware/auth");

// MONGO COLLECTION CONNECT

router.get("/", climbsController.getClimbs);
router.get("/climbs/:name", climbsController.getClimbByName);
router.get("/random", climbsController.getRandomClimb);
router.get("/countries/:country", climbsController.getClimbByCountry);
router.post("/", climbsController.addClimb);
router.patch("/climbs/:name", climbsController.editClimb);
router.delete("/climbs/:id", authMiddleware, climbsController.deleteClimb);

module.exports = router;
