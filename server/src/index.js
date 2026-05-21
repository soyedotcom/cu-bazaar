import express from "express";
import { config } from "dotenv";
import { connectToDB, disconnectFromDB } from "./config/database.js";

import productRoutes from "./routes/productRoutes.js";

config();
connectToDB();
const app = express();
const PORT = process.env.PORT || 5001;

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.json("cu-bazaar api is running");
});
