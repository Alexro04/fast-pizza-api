const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/auth-controller");

router.get("/login", loginUser);
router.get("/register", registerUser);

module.exports = router;
