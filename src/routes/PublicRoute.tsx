import { useQuery } from "convex/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppLoader from "@/common/components/AppLoader";

import { api } from "@db/_generated/api";

const PublicRoute = () => {
  const data = useQuery(api.users.isLoggedIn);
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
