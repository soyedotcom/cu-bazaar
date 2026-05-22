import { prisma } from "../config/database.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  const body = req.body;
  const { name, email, password, confirmPassword, hall, room } = body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      hall,
      room,
    },
  });
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
      },
    },
  });
};

export { signup };
