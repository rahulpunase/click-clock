import { lazy, Suspense } from "react";
import { Outlet, useParams } from "react-router-dom";

import ViewLoader from "@/pages/list/views/[:viewType]/default/ViewLoader";

const LazyDefaultView = lazy(() => import("./default"));

const ViewTypePage = () => {
  const params = useParams();
  const viewType = params.viewType;

  return (
    <Suspense fallback={<ViewLoader />}>
      {viewType === "d" && <LazyDefaultView />}
      <Outlet />
    </Suspense>
  );
};

export default ViewTypePage;
