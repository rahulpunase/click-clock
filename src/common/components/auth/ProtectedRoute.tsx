import AppLoader from "@/common/components/AppLoader";
import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { data, isLoading } = useGetCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return <AppLoader />;
  }

  if (!isLoading && !data) {
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
