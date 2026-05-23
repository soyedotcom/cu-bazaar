import { api } from "./axios.js";

export const fetchProducts = async () => {
  const res = await api.get("/shop");
  return res.data;
};
