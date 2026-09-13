import jwt from "jsonwebtoken";
import "dotenv/config";

export const adminauthMiddleware = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid token",
      });
    }

    const secret = process.env.JWT_SECRET_KEY;
    const payload = jwt.verify(token, secret);
    console.log("Payload", payload);

    if (payload.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
