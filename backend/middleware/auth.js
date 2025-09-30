// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, Login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Ensure req.body always exists
    if (!req.body) req.body = {};

    // For backward compatibility
    req.body.userId = decoded.id;

    // Standard way going forward
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;




/**
import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Add userId in both places for compatibility
   // req.userId = decoded.id;     
    req.body.userId = decoded.id;  

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware; 
 */