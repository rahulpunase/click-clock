import { ListItem } from "@/design-system/ui/List/List.Item";

import FolderListDropdown from "@/common/components/sidebar/spaces/spaceList/FolderListDropdown";
import { useGetSpaces } from "@/common/hooks/useGetSpaces";

type FolderListItemProps = {
  folder: ReturnType<typeof useGetSpaces>["spaces"][number]["folders"][number];
};

const FolderListItem = ({ folder }: FolderListItemProps) => {
  return (
    <ListItem icon="Folder" variant="nav">
      <ListItem.Label>{folder.name}</ListItem.Label>
      <ListItem.Dropdown modal>
        <ListItem.Dropdown.Portal>
          <ListItem.Dropdown.Content>
            <FolderListDropdown />
          </ListItem.Dropdown.Content>
        </ListItem.Dropdown.Portal>
      </ListItem.Dropdown>
    </ListItem>
  );
};

export default FolderListItem;
