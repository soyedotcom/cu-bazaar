import axios from "axios";

export const api = axios.create({
  // baseURL: process.env.SERVER_URL,
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
