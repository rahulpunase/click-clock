import { lazy, Suspense } from "react";
import { Outlet, useParams } from "react-router-dom";

import DefaultViewLoading from "@/pages/list/views/[:viewType]/default/DefaultViewLoading";

const LazyDefaultView = lazy(() => import("./default"));

const ViewTypePage = () => {
  const params = useParams();
  const viewType = params.viewType;

  return (
    <Suspense fallback={<DefaultViewLoading />}>
      {viewType === "d" && <LazyDefaultView />}
      <Outlet />
    </Suspense>
  );
};

export default ViewTypePage;
