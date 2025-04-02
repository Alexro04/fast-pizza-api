const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken)
      return res.status(400).json({
        success: false,
        message: "Access denied! Provide a valid access token.",
      });

    const decodedInfo = jwt.verify(accessToken, process.env.JWT_TOKEN_KEY);
    req.userInfo = decodedInfo;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function adminMiddleware(req, res, next) {
  const { role } = req.userInfo;
  if (role !== "admin")
    return res.status(400).json({
      success: false,
      message: "Access denied! You need admin rights to access this page",
    });
  next();
}

module.exports = { authMiddleware, adminMiddleware };
