import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("SUPABASE_JWT_SECRET is not set.");
}

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      _id: decoded._id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

const authorizeRoles = (...allowedRoles) => {
  console.log("allowedRoles :>> ", allowedRoles);
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Access denied.",
    });
  };
};

export { authenticateToken, authorizeRoles };
