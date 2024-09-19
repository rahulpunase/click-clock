import { Flex } from "@/design-system/layout/Flex/Flex";

import { SpaceContextProvider } from "@/common/components/sidebar/spaces/context/SpaceContextProvider";
import { SpaceList } from "@/common/components/sidebar/spaces/spaceList/SpaceList";
import { SpaceListHeader } from "@/common/components/sidebar/spaces/SpaceListHeader";
import { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";

const SpaceContainer = () => {
  const { data: spaces } = useGetSpaces();
  return (
    <SpaceContextProvider>
      <Flex className="px-2 py-4" direction="flex-col">
        <SpaceListHeader />
        <SpaceList spaces={spaces} />
      </Flex>
    </SpaceContextProvider>
  );
};

export { SpaceContainer };
