import { lazy, Suspense } from "react";
import { Outlet, useParams } from "react-router-dom";

import BoardViewLoading from "@/pages/list/components/loading/BoardViewLoading";
import DefaultViewLoading from "@/pages/list/components/loading/DefaultViewLoading";

const LazyDefaultViewListIdPage = lazy(() => import("./DefaultViewListIdPage"));
const LazyBoardViewListIdPage = lazy(() => import("./BoardViewListIdPage"));

/**
 * [:viewType]
 */
const ViewTypePage = () => {
  const params = useParams();
  const viewType = params.viewType;

  const LoadingComp = () => {
    switch (params.viewType) {
      case "d": {
        return <DefaultViewLoading />;
      }
      case "b": {
        return <BoardViewLoading />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Suspense fallback={<LoadingComp />}>
      {viewType === "d" && <LazyDefaultViewListIdPage />}
      {viewType === "b" && <LazyBoardViewListIdPage />}

      {/* Opens TaskDetailsAsModal */}
      <Outlet />
    </Suspense>
  );
};

export default ViewTypePage;
