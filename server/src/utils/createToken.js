import jwt from "jsonwebtoken";

export const createToken = (userId, userRole, res) => {
  const payload = { id: userId, role: userRole };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "3d",
  });

  res.cookie("jwt_cookie", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000 * 7,
  });
  return token;
};
