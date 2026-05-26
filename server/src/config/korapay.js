import axios from "axios";

export const korapay = axios.create({
  baseURL: process.env.KORAPAY_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});
