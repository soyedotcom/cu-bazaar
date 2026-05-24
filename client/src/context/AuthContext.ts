import { createContext, useContext } from "react";

export type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  hall: string;
  room: string;
};

export type User = {
  id: string;
  email: string;
  role: "USER" | "SELLER" | "ADMIN";
  name: string;
  hall: string;
  room: string;
  createdAt: string;

  isSeller: boolean;
  sellerProfile?: { shopName: string } | null;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;

  signin: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  signout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
