const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	token: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
