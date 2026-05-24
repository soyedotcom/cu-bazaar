import { useEffect, useState, type ReactNode } from "react";
import { api } from "../api/axios";
import { AuthContext, type User, type SignupData } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signin = async (email: string, password: string) => {
    const res = await api.post("/auth/signin", { email, password });
    setUser(res.data.data.user);
  };

  const signup = async (data: SignupData) => {
    const res = await api.post("/auth/signup", data);
    setUser(res.data.data.user);
  };

  const signout = async () => {
    await api.post("/auth/signout");
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data.user);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signin, signup, signout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
