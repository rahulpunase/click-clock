import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppLoader from "@/common/components/AppLoader";
import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";

const PublicRoute = () => {
  const { data: currentUser, isLoading } = useGetCurrentUser();
  const location = useLocation();

  const prevPath = location.state?.prevPath;

  if (isLoading) {
    return <AppLoader />;
  }

  if (!isLoading && !currentUser) {
    return <Outlet />;
  }

  return <Navigate replace to={prevPath ?? "/"} />;
};

export default PublicRoute;
