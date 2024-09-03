import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppLoader from "@/common/components/AppLoader";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

const ProtectedRoute = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();
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
