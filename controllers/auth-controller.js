const User = require("../models/user");
const bcrypt = require("bcryptjs");

function loginUser(req, res) {}

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // check if user exists
    const isExisting = User.findOne({ $or: [{ username }, { email }] });
    if (isExisting)
      res.status(400).json({
        success: false,
        message: "User already exists in database",
      });

    // if user does'nt exist, create a hashed password to be stored in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "New user created successfully.",
      });
    } else throw new Error("Error creating User");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured while registering user.",
    });
  }
}

module.exports = { loginUser, registerUser };
