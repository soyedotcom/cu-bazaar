import { prisma } from "../config/database.js";
import bcrypt from "bcryptjs";

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        hall: true,
        room: true,
        role: true,
        isSeller: true,

        sellerProfile: {
          select: {
            shopName: true,
            description: true,
            logo: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      data: { User: user },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to load user profile" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password, hall, room } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let hashedPassword = user.password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (user.id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update profile" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, password: hashedPassword, hall, room },
      select: {
        id: true,
        name: true,
        email: true,
        hall: true,
        room: true,
        role: true,
        isSeller: true,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user profile" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete profile" });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Couldn't delete user" });
  }
};
export { getUserProfile, updateUserProfile, deleteUser };
