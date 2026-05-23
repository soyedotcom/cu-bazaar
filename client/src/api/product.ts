import { api } from "./axios.js";

export const fetchProducts = async (params?: {
  q?: string;
  category?: string | null;
  subcategory?: string | null;
  section?: string | null;
  page?: number;
  limit?: number;
  signal?: AbortSignal; //remove later
}) => {
  // const res = await api.get("/shop", { params });
  // return res.data;
  const { signal, ...rest } = params || {};
  const res = await api.get("/shop", { params: rest, signal });
  return res.data;
};
