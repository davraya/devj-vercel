import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

export function ProtectedRoute({ isAuthenticated }: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}