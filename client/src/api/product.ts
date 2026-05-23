import { api } from "./axios.js";

export const fetchProducts = async (params?: {
  q?: string;
  category?: string | null;
  subcategory?: string | null;
  section?: string | null;
  page?: number;
  limit?: number;
}) => {
  const res = await api.get("/shop", { params });
  return res.data;
};
