import express from "express";
import { config } from "dotenv";
import { connectToDB, disconnectFromDB } from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import userRoutes from "./routes/userRoutes.js";

config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/profile", userRoutes);

app.get("/", (req, res) => {
  res.json("cu-bazaar api is running");
});

const startServer = async () => {
  await connectToDB();
};

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

startServer();
