const express = require("express");
const router = express.Router();
const climbsController = require("../controllers/climbsController");
const authMiddleware = require("../middleware/auth");

//* MONGO COLLECTION CONNECT
router.get("/", climbsController.getClimbs);
router.get("/random", climbsController.getRandomClimb);

// ? Protected Routes
router.get("/climbs/:name", authMiddleware, climbsController.getClimbByName);
router.get(
  "/countries/:country",

  authMiddleware,
  climbsController.getClimbByCountry
);
router.post("/", authMiddleware, climbsController.addClimb);
router.patch("/climbs/:name", authMiddleware, climbsController.editClimb);
router.delete("/climbs/:id", authMiddleware, climbsController.deleteClimb);

module.exports = router;
