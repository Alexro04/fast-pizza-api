const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth-middleware");

const router = express.Router();
router.get("/base-user/welcome", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to the base user's page",
    user: req.userInfo,
  });
});

router.get(
  "/admin-user/welcome",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome to the admin user's page",
      user: req.userInfo,
    });
  }
);

module.exports = router;
