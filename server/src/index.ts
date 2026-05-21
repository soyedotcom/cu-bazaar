import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/*
 endpoints:
 1. auth
 2. users
 3. products
 4. shop
 5. cart
 6. wishlist
 */

app.get("/", (req, res) => {
  res.send("cubazzar api is running!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
