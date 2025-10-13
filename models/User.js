const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile_number: { type: Number, required: true },
  userId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
