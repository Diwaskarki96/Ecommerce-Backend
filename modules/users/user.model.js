const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 2,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["seller", "buyer"], trim: true },
  gender: {
    type: String,
    required: false,
    enum: ["male", "female"],
    trim: true,
  },
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
