import { lazy, Suspense } from "react";
import { Outlet, useParams } from "react-router-dom";

import DefaultViewLoading from "@/pages/list/components/DefaultViewLoading";

const LazyDefaultViewListIdPage = lazy(() => import("./DefaultViewListIdPage"));

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
