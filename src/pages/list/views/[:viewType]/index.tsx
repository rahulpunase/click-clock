import { lazy, Suspense } from "react";
import { Outlet, useParams } from "react-router-dom";

import AppLoader from "@/common/components/AppLoader";

const LazyDefaultView = lazy(() => import("./default"));

const ViewTypePage = () => {
  const params = useParams();
  const viewType = params.viewType;

  return (
    <Suspense fallback={<AppLoader />}>
      {viewType === "d" && <LazyDefaultView />}
      <Outlet />
    </Suspense>
  );
};

export default ViewTypePage;
