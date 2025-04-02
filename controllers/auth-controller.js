const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    //Check if user exists
    if (!user)
      return res.status(404).json({
        success: false,
        message: "A user with this username does not exist in the datbase.",
      });

    //check if password is correct
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({
        success: false,
        message: "Invalid Password.",
      });

    const accessToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      success: true,
      message: "Login Sucessful.",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function registerUser(req, res) {
  try {
    const { username, email, password, role } = req.body;

    // check if user exists
    const isExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (isExistingUser)
      return res.status(400).json({
        success: false,
        message:
          "User with the same username, or email already exists in database",
      });

    // if user does'nt exist, create a hashed password to be stored in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
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
      message: error.message,
    });
  }
}

module.exports = { loginUser, registerUser };
