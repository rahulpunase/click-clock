import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";

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
  return (
    <>
      <List>
        <ListItem variant="nav" icon="Globe">
          <ListItem.Label>Everything</ListItem.Label>
        </ListItem>
        {spaces.map((space) => (
          <SpaceListItem key={space._id} space={space} />
        ))}
      </List>
    </>
  );
};

export { SpaceList };
