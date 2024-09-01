import AppLoader from "@/common/components/AppLoader";
import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser, isLoading } = useGetCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return <AppLoader />;
  }

  if (!isLoading && !currentUser) {
    return (
      <Navigate
        replace
        to="/auth/sign-in"
        state={{
          prevPath: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
