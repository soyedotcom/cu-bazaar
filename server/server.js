import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const connectToDB = () => {
  mongoose.connect(MONGODB_URL).then(() => {
    console.log("connected to database");
  });
};

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  connectToDB();
});
