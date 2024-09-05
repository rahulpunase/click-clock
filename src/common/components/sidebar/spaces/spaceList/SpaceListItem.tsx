import { Link } from "react-router-dom";

import { IconName } from "@/design-system/ui/Icon/Icon";
import { ListItem } from "@/design-system/ui/List/List.Item";

import FolderListItem from "@/common/components/sidebar/spaces/spaceList/FolderListItem";
import SpaceListDropDownItems from "@/common/components/sidebar/spaces/spaceList/SpaceListDropDownItems";
import type { useGetSpaces } from "@/common/hooks/db/spaces/queries/useGetSpaces";

type SpaceListItemProps = {
  space: ReturnType<typeof useGetSpaces>["data"][number];
};

const SpaceListItem = ({ space }: SpaceListItemProps) => {
  return (
    <ListItem
      variant="nav"
      icon={(space.icon as IconName) ?? "space"}
      iconBackgroundColor={space.color}
      render={(props) => <Link to={`/spaces/${space._id}`} {...props} />}
    >
      <ListItem.Label>{space.name}</ListItem.Label>
      {space.isPrivate && <ListItem.SmallIcon icon="lock" />}
      {space.folders.length ? (
        <ListItem.ExpandableList>
          {space.folders.map((folder) => (
            <FolderListItem key={folder._id} folder={folder} />
          ))}
        </ListItem.ExpandableList>
      ) : null}
      <ListItem.Dropdown modal>
        <ListItem.Dropdown.Portal>
          <ListItem.Dropdown.Content>
            <SpaceListDropDownItems space={space} />
          </ListItem.Dropdown.Content>
        </ListItem.Dropdown.Portal>
      </ListItem.Dropdown>
    </ListItem>
  );
};

export default SpaceListItem;
