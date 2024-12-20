import { lazy, Suspense } from "react";

import { Flex } from "@/design-system/layout/Flex/Flex";

import { SpaceList } from "@/common/components/sidebar/spaces/SpaceList";
import { SpaceListHeader } from "@/common/components/sidebar/spaces/SpaceListHeader";
import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";
import useGlobalDialogStore from "@/common/store/useGlobalDialogStore";

const LazyLoadedStatusModal = lazy(
  () => import("@/common/components/modals/NewStatusEditModal"),
);

const SpaceContainer = () => {
  const { data: spaces } = useGetSpaces();
  const { dialog } = useGlobalDialogStore();

  return (
    <>
      <Flex className="px-2 py-4" direction="flex-col">
        <SpaceListHeader />
        <SpaceList spaces={spaces} />
      </Flex>
      <Suspense>
        {dialog === "list-status" && <LazyLoadedStatusModal />}
      </Suspense>
    </>
  );
};

export { SpaceContainer };
