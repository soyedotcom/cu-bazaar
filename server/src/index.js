import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectToDB, disconnectFromDB } from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import withdrawalRoutes from "./routes/withdrawalRoutes.js";

config();

const app = express();
const PORT = process.env.PORT;
const startServer = async () => {
  await connectToDB();
};

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/orders/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/orders", orderRoutes);
app.use("/profile", userRoutes);
app.use("/seller", sellerRoutes);
app.use("/shop", shopRoutes);
app.use("/upload", uploadRoutes);
app.use("/orders", orderRoutes);
app.use("/seller/withdrawals", withdrawalRoutes);

app.get("/", (req, res) => {
  res.json("cu-bazaar api is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

startServer();
