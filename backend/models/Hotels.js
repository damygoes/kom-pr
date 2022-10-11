const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: {
        type: Object,
        required: false,
        default: {
            latitude: 0,
            longitude: 0
        }
    },
    images: { type: Array, required: false },
    rating: { type: Number, required: true, default: 0 },
    country: { type: String, required: true },
    ecoFriendlyTag: { type: Boolean, required: true, default: false },
    amenities: { type: Array, required: true }
});

module.exports = mongoose.model("Hotel", HotelSchema);