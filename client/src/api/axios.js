import axios from "axios";

export const api = axios.create({
  baseUrl: process.env.SERVER_URL,
  withCredentials: true,
});
