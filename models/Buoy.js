const mongoose = require("mongoose");

const buoySchema = mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  link: { type: String, required: true },
  desiredDPD: { type: Number, required: true },
  desiredWVHT: { type: Number, default: 3 },
  desiredMWD: { type: [String] },
});

const Buoy = mongoose.model("Buoy", buoySchema);

module.exports = Buoy;
