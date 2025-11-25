import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use("/cu-bazaar/auth", authRouter);

const connectToDB = () => {
  mongoose.connect(MONGODB_URL).then(() => {
    console.log("connected to database");
  });
};

app.listen(PORT, () => {
  connectToDB();
  console.log(`App running on port ${PORT}`);
});
