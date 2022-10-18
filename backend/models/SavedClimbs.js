const mongoose = require("mongoose");

const SavedClimbsSchema = mongoose.Schema({
  userID: { type: String, required: true },
  climbID: { type: String, required: true },
});

module.exports = mongoose.model("SavedClimbs", SavedClimbsSchema);
