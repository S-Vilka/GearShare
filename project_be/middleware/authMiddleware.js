const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;


// To protect a route, simply apply the authMiddleware like this:

// const authMiddleware = require("./middleware/authMiddleware");

// app.get("/protected-route", authMiddleware, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });
