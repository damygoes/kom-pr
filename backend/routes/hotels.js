const express = require("express");
const router = express.Router();
const hotelsController = require("../controllers/hotelsController");
const { createHotelValidation } = require("../controllers/validations/hotels/create");
const requestValidator = require("../middleware/requestValidator");

router.post("/create", createHotelValidation, requestValidator, hotelsController.createHotel);


module.exports = router;