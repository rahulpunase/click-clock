import { Globe, LayoutDashboard, Plus } from "lucide-react";

import { Button } from "@/design-system/ui/Button/Button";
import { List } from "@/design-system/ui/List/List";
import { ListItem } from "@/design-system/ui/List/List.Item";

import { useSpaceContext } from "@/common/components/sidebar/spaces/context/SpaceListContext";
import SpaceListItem from "@/common/components/sidebar/spaces/spaceList/SpaceListItem";
import type { Spaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";

export type NewSpaceModalStoreDataType = {
  spaceId: string;
};

const SpaceList = ({ spaces }: { spaces: Spaces }) => {
  const { createSpaceModalStore } = useSpaceContext();
  return (
    <>
      <List>
        <ListItem variant="nav" icon={Globe}>
          <ListItem.Label>Everything</ListItem.Label>
        </ListItem>
        {spaces.map((space) => (
          <SpaceListItem key={space._id} space={space} />
        ))}
        {spaces.length > 2 && (
          <Button variant="ghost" size="sm" icon={LayoutDashboard}>
            View all space
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          icon={Plus}
          onClick={() => createSpaceModalStore.show()}
        >
          Create new space
        </Button>
      </List>
    </>
  );
};

export { SpaceList };
