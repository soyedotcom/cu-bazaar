import jwt from "jsonwebtoken";
import { prisma } from "../config/database.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt_cookie) {
    token = req.cookies.jwt_cookie;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: "User doesn't exist." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Token failed." });
  }
};
