const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true, default: false },
  avatar: { type: String, unique: true },
  savedItems: [{ type: {}, default: {} }],
  profile: {
    ftp: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    wattPerKilo: { type: Number, default: 0.0 },
    bikeWeight: { type: Number, default: 0 },
    gender: { type: String, default: "" },
    location: { type: String, default: "" },
  },
});

module.exports = mongoose.model("User", UserSchema);
