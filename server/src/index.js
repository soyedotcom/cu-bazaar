import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB, disconnectFromDB } from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";

config();

const app = express();
const PORT = process.env.PORT || 5001;
const startServer = async () => {
  await connectToDB();
};

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/profile", userRoutes);
app.use("/seller", sellerRoutes);

app.get("/", (req, res) => {
  res.json("cu-bazaar api is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

startServer();
