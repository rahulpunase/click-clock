import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppLoader from "@/common/components/AppLoader";
import PresenceListenerMemo from "@/common/components/presence/PresenceListener";
import PresenceUpdaterMemo from "@/common/components/presence/PresenceUpdater";
import { useIsLoggedIn } from "@/common/hooks/db/user/queries/useIsLoggedIn";

const ProtectedRoute = () => {
  const { data } = useIsLoggedIn();

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

export default ProtectedRoute;
