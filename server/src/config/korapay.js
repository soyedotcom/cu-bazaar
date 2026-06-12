import axios from "axios";

export const korapayPublic = axios.create({
  baseURL: process.env.KORAPAY_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.KORA_PUBLIC_KEY}`,
    "Content-Type": "application/json",
  },
});

export const korapaySecret = axios.create({
  baseURL: process.env.KORAPAY_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.KORA_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});
