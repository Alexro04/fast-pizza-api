const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

module.exports = mongoose.model("User", UserSchema);
