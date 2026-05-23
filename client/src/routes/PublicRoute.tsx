import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = {
  children: React.ReactNode;
};

const PublicOnlyRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
