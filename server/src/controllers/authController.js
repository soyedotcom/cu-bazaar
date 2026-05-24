import { prisma } from "../config/database.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/createToken.js";

const signup = async (req, res) => {
  const { name, email, password, confirmPassword, hall, room } = req.body;

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

  const token = createToken(newUser.id, newUser.role, res);
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    },
  });
};

const signin = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid email" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = createToken(user.id, user.role, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    },
  });
};

const signout = (req, res) => {
  res.cookie("jwt_cookie", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

const getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      hall: true,
      room: true,
      createdAt: true,

      isSeller: true,
      sellerProfile: { select: { shopName: true } },
    },
  });

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

export { signup, signin, signout, getMe };
