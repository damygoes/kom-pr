const mongoose = require("mongoose");

const ClimbSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: false },
  country: { type: String, required: true },
  distance: { type: Number, required: true },
  avgGradient: { type: Number, required: true },
  maxGradient: { type: Number, required: false },
  elevation: { type: Number, required: false },
  image: { type: String, required: true },
  liked: { type: Boolean, required: true },
});

module.exports = mongoose.model("Climbs", ClimbSchema);
