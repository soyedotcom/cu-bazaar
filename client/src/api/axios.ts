import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message);
    }

    return response;
  },
  (error) => {
    toast.error(error.response?.data?.error || "Something went wrong");

    return Promise.reject(error);
  },
);
