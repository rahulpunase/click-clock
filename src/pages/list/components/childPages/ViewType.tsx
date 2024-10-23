import { lazy, Suspense } from "react";
import { Outlet, useParams } from "react-router-dom";

import DefaultViewLoading from "@/pages/list/pages/ViewType/pages/DefaultViewListId/DefaultViewLoading";

const LazyDefaultViewListIdPage = lazy(
  () => import("./pages/DefaultViewListId"),
);

/**
 * [:viewType]
 */
const ViewTypePage = () => {
  const params = useParams();
  const viewType = params.viewType;

  return (
    <Suspense fallback={<DefaultViewLoading />}>
      {viewType === "d" && <LazyDefaultViewListIdPage />}

      {/* Opens TaskDetailsAsModal */}
      <Outlet />
    </Suspense>
  );
};

export default ViewTypePage;
