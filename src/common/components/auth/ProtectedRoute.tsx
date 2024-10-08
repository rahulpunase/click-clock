import { useQuery } from "convex/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppLoader from "@/common/components/AppLoader";
import PresenceListenerMemo from "@/common/hooks/onlinePresence/PresenceListener";
import PresenceUpdaterMemo from "@/common/hooks/onlinePresence/PresenceUpdater";

import { api } from "@db/_generated/api";

const ProtectedRoute = () => {
  const data = useQuery(api.users.isLoggedIn);

  const location = useLocation();

  if (data === undefined) {
    return <AppLoader />;
  }

  if (data !== undefined && !data) {
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

  return (
    <>
      <PresenceUpdaterMemo />
      <PresenceListenerMemo />
      <Outlet />
    </>
  );
};

export { ProtectedRoute };
