import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppLoader from "@/common/components/AppLoader";
import { useIsLoggedIn } from "@/common/hooks/db/user/queries/useIsLoggedIn";

const PublicRoute = () => {
  const { data } = useIsLoggedIn();
  const location = useLocation();
  const prevPath = location.state?.prevPath;

  if (data === undefined) {
    return <AppLoader />;
  }

  if (data !== undefined && !data) {
    return <Outlet />;
  }

  return <Navigate replace to={prevPath ?? "/"} />;
};

export default PublicRoute;
