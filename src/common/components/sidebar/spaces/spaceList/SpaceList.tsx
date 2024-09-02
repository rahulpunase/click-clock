import { useDialogStore } from "@/design-system/ui/Dialog/useDialogStore";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";

import CreateNewFolderModal from "@/common/components/sidebar/spaces/modals/CreateNewFolderModal";
import SpaceListItem from "@/common/components/sidebar/spaces/spaceList/SpaceListItem";
import type { useGetSpaces } from "@/common/hooks/useGetSpaces";

export type NewSpaceModalStoreDataType = {
  spaceId: string;
};

const SpaceList = ({
  spaces,
}: {
  spaces: ReturnType<typeof useGetSpaces>["spaces"];
}) => {
  const createNewFolderStore = useDialogStore<NewSpaceModalStoreDataType>();

  return (
    <>
      <List>
        <ListItem variant="nav" icon="Globe">
          <ListItem.Label>Everything</ListItem.Label>
        </ListItem>
        {spaces.map((space) => (
          <SpaceListItem space={space} />
        ))}
      </List>
      {createNewFolderStore.open && (
        <CreateNewFolderModal store={createNewFolderStore} />
      )}
    </>
  );
};

export default SpaceList;
