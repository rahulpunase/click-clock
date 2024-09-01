import AppLoader from "@/common/components/AppLoader";
import { useGetCurrentUser } from "@/common/hooks/useGetCurrentUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {
  const { currentUser, isLoading } = useGetCurrentUser();
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
