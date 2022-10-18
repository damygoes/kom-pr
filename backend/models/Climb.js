const mongoose = require("mongoose");

const ClimbSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: false },
  country: { type: String, required: true },
  distance: { type: Number, required: false },
  avgGradient: { type: Number, required: false },
  maxGradient: { type: Number, required: false },
  elevation: { type: Number, required: false },
  images: [{ type: String, required: true }],
});

module.exports = mongoose.model("Climbs", ClimbSchema);
