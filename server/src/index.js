import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/product", productRoutes);

/*
 endpoints:
 1. auth
 2. users
 3. products
 4. shop
 5. cart
 6. wishlist
 */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


