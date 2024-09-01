import CreateNewSpaceModal from "@/common/components/sidebar/spaces/CreateNewSpaceModal";
import SpaceList from "@/common/components/sidebar/spaces/SpaceList";
import SpaceListHeader from "@/common/components/sidebar/spaces/SpaceListHeader";
import { useGetSpaces } from "@/common/hooks/useGetSpaces";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";

const SpaceContainer = () => {
  const createNewSpaceModalStore = useDialogStore();
  const { spaces } = useGetSpaces();

  return (
    <>
      <Flex className="px-2 py-4" direction="flex-col">
        <SpaceListHeader onPlusIconClick={createNewSpaceModalStore.show} />
        <SpaceList spaces={spaces} />
      </Flex>
      {createNewSpaceModalStore.open && (
        <CreateNewSpaceModal store={createNewSpaceModalStore} />
      )}
    </>
  );
};

export default SpaceContainer;
