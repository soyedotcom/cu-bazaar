import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or spinner

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
