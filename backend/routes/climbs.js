const express = require("express");
const router = express.Router();
const climbsController = require("../controllers/climbsController");
const passportAuth = require("../middleware/jwtAuth");

//* MONGO COLLECTION CONNECT
router.get("/", climbsController.getClimbs);

// ? Protected Routes
router.get("/climbs/:name", passportAuth, climbsController.getClimbByName);
router.get("/random", passportAuth, climbsController.getRandomClimb);
router.get(
  "/countries/:country",
  passportAuth,
  climbsController.getClimbByCountry
);
router.post("/", passportAuth, climbsController.addClimb);
router.patch("/climbs/:name", passportAuth, climbsController.editClimb);
router.delete("/climbs/:id", passportAuth, climbsController.deleteClimb);

module.exports = router;
